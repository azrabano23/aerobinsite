import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { MapView } from '../map/MapView'
import { Building2, MapPin, TrendingUp } from 'lucide-react'

import type { Bin } from '../../types'

// Simulated large-scale deployment data
const generateCitywideBins = (count: number, center: [number, number], spread: number): Bin[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `CITY-${String(i + 1).padStart(4, '0')}`,
    organization: 'City Deployment',
    location: `City Bin ${i + 1}`,
    lat: center[0] + (Math.random() - 0.5) * spread,
    lng: center[1] + (Math.random() - 0.5) * spread,
    fill: Math.floor(Math.random() * 100),
    battery: Math.floor(Math.random() * 30) + 70,
    lastEmptied: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: (() => {
      const fill = Math.floor(Math.random() * 100)
      if (fill < 40) return 'normal' as const
      if (fill < 80) return 'warning' as const
      return 'critical' as const
    })(),
  }))
}

export function CitywideDeployment() {
  // NYC deployment - always show New York City
  const nycBins = generateCitywideBins(500, [40.7128, -74.006], 0.1)
  const cityName = 'New York City'
  const center: [number, number] = [40.7128, -74.006]

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-2 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Building2 className="h-6 w-6 text-emerald-500" />
          Citywide Deployment: {cityName}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Simulated large-scale deployment with {nycBins.length.toLocaleString()} bins
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-[500px] rounded-lg border bg-card relative overflow-hidden">
          <MapView bins={nycBins.slice(0, 200)} center={center} zoom={11} />
          <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-md p-4 rounded-lg border border-border shadow-lg z-[1000]">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-semibold">{cityName}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {nycBins.length.toLocaleString()} bins deployed
              </div>
              <div className="text-xs text-muted-foreground">
                Coverage: Manhattan
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-muted/50"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              <span className="text-sm font-medium">Total Bins</span>
            </div>
            <p className="text-2xl font-bold">{nycBins.length.toLocaleString()}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 rounded-lg bg-muted/50"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              <span className="text-sm font-medium">Est. Annual Savings</span>
            </div>
            <p className="text-2xl font-bold text-emerald-500">
              ${(nycBins.length * 1500).toLocaleString()}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-lg bg-muted/50"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              <span className="text-sm font-medium">CO₂ Reduction</span>
            </div>
            <p className="text-2xl font-bold text-emerald-500">
              {(nycBins.length * 2.5).toFixed(0)} tons/year
            </p>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}

