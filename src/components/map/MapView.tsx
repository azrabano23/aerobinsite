import { useEffect, useMemo, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import type { Bin } from '../../types'
import { getCenter, getBounds } from '../../utils/geo'
import { formatPercent } from '../../utils/format'
import 'leaflet.markercluster'

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

export function createCustomIcon(status: Bin['status']) {
  const colors = {
    normal: '#10b981',
    warning: '#f59e0b',
    critical: '#ef4444',
    offline: '#6b7280',
  }

  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: ${colors[status]};
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

function MapBounds({ bins }: { bins: Bin[] }) {
  const map = useMap()

  useEffect(() => {
    if (bins.length > 0) {
      const bounds = getBounds(bins)
      map.fitBounds(bounds as any, { padding: [50, 50] })
    }
  }, [bins, map])

  return null
}

// Clustering component for MapView
function MarkerCluster({ bins, onBinClick }: { bins: Bin[]; onBinClick?: (bin: Bin) => void }) {
  const map = useMap()
  const clusterRef = useRef<any>(null)

  useEffect(() => {
    if (!clusterRef.current && (L as any).markerClusterGroup) {
      clusterRef.current = (L as any).markerClusterGroup({
        chunkedLoading: true,
        iconCreateFunction: (cluster: any) => {
          const count = cluster.getChildCount()
          return L.divIcon({
            html: `<div style="
              background: #10b981;
              color: white;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: 14px;
              border: 3px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            ">${count}</div>`,
            className: 'marker-cluster',
            iconSize: [40, 40],
          })
        },
      })
      map.addLayer(clusterRef.current)
    }

    clusterRef.current.clearLayers()

    bins.forEach((bin) => {
      const marker = L.marker([bin.lat, bin.lng], {
        icon: createCustomIcon(bin.status),
      })

      marker.bindPopup(`
        <div style="min-width: 200px; padding: 8px;">
          <div style="font-weight: 600; margin-bottom: 4px;">${bin.id}</div>
          <div style="font-size: 14px; color: #666; margin-bottom: 4px;">${bin.location}</div>
          ${bin.campus ? `<div style="font-size: 12px; color: #999; margin-bottom: 4px;">Campus: ${bin.campus}</div>` : ''}
          <div style="font-size: 14px; margin-bottom: 4px;">
            Fill: ${formatPercent(bin.fill)} • Battery: ${bin.battery}%
          </div>
          <div style="font-size: 12px; color: #999;">
            Last emptied: ${new Date(bin.lastEmptied).toLocaleDateString()}
          </div>
        </div>
      `)

      marker.on('click', () => {
        onBinClick?.(bin)
      })

      clusterRef.current!.addLayer(marker)
    })

    return () => {
      if (clusterRef.current) {
        map.removeLayer(clusterRef.current)
        clusterRef.current = null
      }
    }
  }, [bins, map, onBinClick])

  return null
}

interface MapViewProps {
  bins: Bin[]
  center?: [number, number]
  zoom?: number
  onBinClick?: (bin: Bin) => void
}

export function MapView({ bins, center, zoom = 13, onBinClick }: MapViewProps) {
  const mapCenter = useMemo(() => {
    if (center) return center
    if (bins.length === 0) return [40.8075, -73.9626] as [number, number]
    const centerPoint = getCenter(bins)
    return [centerPoint.lat, centerPoint.lng] as [number, number]
  }, [bins, center])

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {bins.length > 0 && <MapBounds bins={bins} />}
        {bins.length > 10 ? (
          <MarkerCluster bins={bins} onBinClick={onBinClick} />
        ) : (
          bins.map((bin) => (
            <Marker
              key={bin.id}
              position={[bin.lat, bin.lng]}
              icon={createCustomIcon(bin.status)}
              eventHandlers={{
                click: () => onBinClick?.(bin),
              }}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <div className="font-semibold mb-1">{bin.id}</div>
                  <div className="text-sm text-gray-600 mb-1">{bin.location}</div>
                  {bin.campus && (
                    <div className="text-xs text-gray-500 mb-1">Campus: {bin.campus}</div>
                  )}
                  <div className="text-sm mb-1">
                    Fill: {formatPercent(bin.fill)} • Battery: {bin.battery}%
                  </div>
                  <div className="text-xs text-gray-500">
                    Last emptied: {new Date(bin.lastEmptied).toLocaleDateString()}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))
        )}
      </MapContainer>
    </div>
  )
}


