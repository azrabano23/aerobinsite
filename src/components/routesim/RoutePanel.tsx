import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { Input } from '../ui/input'
import { MapView } from '../map/MapView'
import { useAppStore } from '../../store/useAppStore'
import { haversineDistance } from '../../utils/geo'
import { formatNumber } from '../../utils/format'
import type { Bin, Route, RouteStop } from '../../types'

export function RoutePanel() {
  const { bins, selectedRoute, setSelectedRoute } = useAppStore()
  const [capacity, setCapacity] = useState(8)
  const [threshold, setThreshold] = useState(40)

  // Initialize route selection to 'manual' if null
  useEffect(() => {
    if (!selectedRoute) {
      setSelectedRoute('manual')
    }
  }, [selectedRoute, setSelectedRoute])

  const route = useMemo(() => {
    if (!selectedRoute) return null

    const eligibleBins = bins.filter(
      (b) => b.status !== 'offline' && b.fill >= threshold
    )

    if (eligibleBins.length === 0) return null

    let stops: RouteStop[] = []
    let totalDistance = 0

    if (selectedRoute === 'manual') {
      // Manual: sort by latitude (top to bottom)
      const sorted = [...eligibleBins].sort((a, b) => b.lat - a.lat)
      const selected = sorted.slice(0, capacity)

      selected.forEach((bin, idx) => {
        const distance =
          idx === 0 ? 0 : haversineDistance(stops[idx - 1].bin, bin)
        totalDistance += distance
        stops.push({ bin, order: idx + 1, distanceFromPrevious: distance })
      })
    } else {
      // AI: nearest neighbor heuristic
      const remaining = [...eligibleBins]
      const visited = new Set<string>()

      // Start with highest fill bin
      let current = remaining.reduce((max, bin) =>
        bin.fill > max.fill ? bin : max
      )
      remaining.splice(remaining.indexOf(current), 1)
      visited.add(current.id)
      stops.push({ bin: current, order: 1, distanceFromPrevious: 0 })

      while (stops.length < capacity && remaining.length > 0) {
        let nearest: Bin | null = null
        let minDistance = Infinity

        for (const bin of remaining) {
          if (visited.has(bin.id)) continue
          const dist = haversineDistance(current, bin)
          if (dist < minDistance) {
            minDistance = dist
            nearest = bin
          }
        }

        if (!nearest) break

        const idx = remaining.indexOf(nearest)
        remaining.splice(idx, 1)
        visited.add(nearest.id)
        totalDistance += minDistance
        stops.push({
          bin: nearest,
          order: stops.length + 1,
          distanceFromPrevious: minDistance,
        })
        current = nearest
      }
    }

    const estimatedTime = (totalDistance / 20) * 60 // 20 km/h, convert to minutes
    const baselineTrips = 3
    const tripsSaved = Math.max(0, baselineTrips - Math.ceil(stops.length / capacity))

    return {
      stops,
      totalDistance,
      estimatedTime,
      tripsSaved,
    } as Route
  }, [bins, selectedRoute, capacity, threshold])

  const routeBins = route?.stops.map((s) => s.bin) || []

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Route Simulation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs 
            value={selectedRoute || 'manual'} 
            onValueChange={(v) => {
              if (v === 'manual' || v === 'ai') {
                setSelectedRoute(v)
              }
            }}
          >
            <TabsList>
              <TabsTrigger value="manual">Manual</TabsTrigger>
              <TabsTrigger value="ai">AI Optimized</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Capacity (stops)</label>
              <Input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                min={1}
                max={20}
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Threshold (%)</label>
              <Input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                min={0}
                max={100}
              />
            </div>
          </div>

          {route && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Stops</p>
                <p className="text-2xl font-bold">{route.stops.length}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Distance</p>
                <p className="text-2xl font-bold">{formatNumber(Number(route.totalDistance.toFixed(1)))} km</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="text-2xl font-bold">{Math.round(route.estimatedTime)} min</p>
              </div>
            </div>
          )}

          {route && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Route Stops</p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {route.stops.map((stop) => (
                  <div
                    key={stop.bin.id}
                    className="flex items-center justify-between p-2 rounded bg-muted/50"
                  >
                    <div>
                      <span className="font-medium">{stop.bin.id}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        {stop.bin.location}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stop.distanceFromPrevious > 0
                        ? `${stop.distanceFromPrevious.toFixed(1)} km`
                        : 'Start'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="h-[500px]">
            <MapView bins={routeBins} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


