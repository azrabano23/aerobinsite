export interface LatLng {
  lat: number
  lng: number
}

/**
 * Calculate distance between two points using Haversine formula
 * Returns distance in kilometers
 */
export function haversineDistance(point1: LatLng, point2: LatLng): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = toRad(point2.lat - point1.lat)
  const dLon = toRad(point2.lng - point1.lng)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(point1.lat)) *
      Math.cos(toRad(point2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * Calculate center point of multiple coordinates
 */
export function getCenter(points: LatLng[]): LatLng {
  if (points.length === 0) return { lat: 0, lng: 0 }
  const sum = points.reduce(
    (acc, point) => ({
      lat: acc.lat + point.lat,
      lng: acc.lng + point.lng,
    }),
    { lat: 0, lng: 0 }
  )
  return {
    lat: sum.lat / points.length,
    lng: sum.lng / points.length,
  }
}

/**
 * Calculate bounding box for map fitBounds
 */
export function getBounds(points: LatLng[]): [[number, number], [number, number]] {
  if (points.length === 0) {
    return [
      [0, 0],
      [0, 0],
    ]
  }
  const lats = points.map((p) => p.lat)
  const lngs = points.map((p) => p.lng)
  return [
    [Math.min(...lats), Math.min(...lngs)],
    [Math.max(...lats), Math.max(...lngs)],
  ]
}


