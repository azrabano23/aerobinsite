import { useEffect, useMemo, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Bin, RouteStop } from '../../types'
import { getCenter, getBounds } from '../../utils/geo'
import { createCustomIcon } from './MapView'

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Calculate position along a line segment
function interpolatePoint(start: [number, number], end: [number, number], t: number): [number, number] {
  return [start[0] + (end[0] - start[0]) * t, start[1] + (end[1] - start[1]) * t]
}

// Calculate bearing for truck rotation
function calculateBearing(start: [number, number], end: [number, number]): number {
  const lat1 = (start[0] * Math.PI) / 180
  const lat2 = (end[0] * Math.PI) / 180
  const dLon = ((end[1] - start[1]) * Math.PI) / 180

  const y = Math.sin(dLon) * Math.cos(lat2)
  const x =
    Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon)

  const bearing = (Math.atan2(y, x) * 180) / Math.PI
  return (bearing + 360) % 360
}

// Animated truck component
function AnimatedTruck({
  route,
  isPlaying,
  speed = 1,
}: {
  route: RouteStop[]
  isPlaying: boolean
  speed?: number
}) {
  const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null)
  const [currentSegment, setCurrentSegment] = useState(0)
  const [progress, setProgress] = useState(0)
  const [rotation, setRotation] = useState(0)
  const animationRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!isPlaying || route.length === 0) {
      if (route.length > 0) {
        setCurrentPosition([route[0].bin.lat, route[0].bin.lng])
        setCurrentSegment(0)
        setProgress(0)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      return
    }

    let lastTime = performance.now()
    const animate = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 16.67 // Normalize to ~60fps
      lastTime = currentTime

      setProgress((prev) => {
        const newProgress = prev + 0.008 * speed * (delta / 16.67)

        if (newProgress >= 1) {
          // Move to next segment
          if (currentSegment < route.length - 1) {
            setCurrentSegment((prev) => prev + 1)
            return 0
          } else {
            // Loop back to start
            setCurrentSegment(0)
            return 0
          }
        }

        return newProgress
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, route, speed])

  useEffect(() => {
    if (route.length === 0 || currentSegment >= route.length) return

    const currentStop = route[currentSegment]
    if (!currentStop) return
    
    const nextStop = route[currentSegment + 1]

    if (!nextStop) {
      // At last stop, stay there
      setCurrentPosition([currentStop.bin.lat, currentStop.bin.lng])
      return
    }

    const start: [number, number] = [currentStop.bin.lat, currentStop.bin.lng]
    const end: [number, number] = [nextStop.bin.lat, nextStop.bin.lng]

    const position = interpolatePoint(start, end, progress)
    setCurrentPosition(position)

    // Calculate rotation
    const bearing = calculateBearing(start, end)
    setRotation(bearing)
  }, [route, currentSegment, progress])

  if (!currentPosition) return null

  // Create rotated truck icon - use key to force re-render for rotation
  const truckIcon = useMemo(() => {
    return L.divIcon({
      className: 'truck-marker',
      html: `
        <div style="
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border: 3px solid white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(${rotation}deg);
          transition: transform 0.2s ease-out;
        ">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(0deg);">
            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
          </svg>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    })
  }, [rotation])

  return <Marker key={`truck-${rotation}-${currentPosition[0]}-${currentPosition[1]}`} position={currentPosition} icon={truckIcon} />
}

function MapBounds({ bins }: { bins: Bin[] }) {
  const map = useMap()

  useEffect(() => {
    if (bins.length > 0) {
      const bounds = getBounds(bins)
      map.fitBounds(bounds as any, { padding: [100, 100] })
    }
  }, [bins, map])

  return null
}

interface RouteMapViewProps {
  route: RouteStop[]
  bins: Bin[]
  center?: [number, number]
  zoom?: number
  isPlaying?: boolean
  speed?: number
}

export function RouteMapView({
  route,
  bins,
  center,
  zoom = 13,
  isPlaying = true,
  speed = 1,
}: RouteMapViewProps) {
  const mapCenter = useMemo(() => {
    if (center) return center
    if (bins.length === 0) return [40.8075, -73.9626] as [number, number]
    const centerPoint = getCenter(bins)
    return [centerPoint.lat, centerPoint.lng] as [number, number]
  }, [bins, center])

  // Create polyline path from route
  const routePath = useMemo(() => {
    if (route.length === 0) return []
    return route.map((stop) => [stop.bin.lat, stop.bin.lng] as [number, number])
  }, [route])

  return (
    <div className="w-full h-full rounded-lg overflow-hidden relative">
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

        {/* Route polyline */}
        {routePath.length > 1 && (
          <Polyline
            positions={routePath}
            pathOptions={{
              color: '#10b981',
              weight: 4,
              opacity: 0.8,
              dashArray: '10, 5',
            }}
          />
        )}

        {/* Bin markers */}
        {bins.map((bin) => (
          <Marker
            key={bin.id}
            position={[bin.lat, bin.lng]}
            icon={createCustomIcon(bin.status)}
          />
        ))}

        {/* Animated truck */}
        {route.length > 0 && (
          <AnimatedTruck route={route} isPlaying={isPlaying} speed={speed} />
        )}
      </MapContainer>

      {/* Route info overlay */}
      {route.length > 0 && (
        <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm p-3 rounded-lg border border-border shadow-lg z-[1000]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-sm font-semibold">Active Route</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {route.length} stops • {isPlaying ? 'In Progress' : 'Paused'}
          </div>
        </div>
      )}
    </div>
  )
}
