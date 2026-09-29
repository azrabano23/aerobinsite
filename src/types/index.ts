export interface Bin {
  id: string
  organization: string
  campus?: string
  location: string
  lat: number
  lng: number
  fill: number // 0-100
  battery: number // 0-100
  lastEmptied: string // ISO string
  status: 'normal' | 'warning' | 'critical' | 'offline'
}

export interface RouteStop {
  bin: Bin
  order: number
  distanceFromPrevious: number // km
}

export interface Route {
  stops: RouteStop[]
  totalDistance: number // km
  estimatedTime: number // minutes
  tripsSaved: number
}

export type Organization = 'Columbia University' | 'Rutgers University'
export type RutgersCampus = 'College Avenue' | 'Busch' | 'Cook' | 'Livingston' | 'Douglass' | 'All sites'


