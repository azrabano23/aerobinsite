import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs'
import { Topbar } from '../components/layout/Topbar'
import { KpiTile } from '../components/common/KpiTile'
import { EnhancedMapView } from '../components/map/EnhancedMapView'
import { MarkerLegend } from '../components/map/MarkerLegend'
import { BinTable } from '../components/bins/BinTable'
import { AlertsPanel } from '../components/alerts/AlertsPanel'
import { RoutePanel } from '../components/routesim/RoutePanel'
import { AnalyticsPanel } from '../components/analytics/AnalyticsPanel'
import { RoiPanel } from '../components/roi/RoiPanel'
import { DateRangePicker } from '../components/common/DateRangePicker'
import { useAppStore, simulateLiveUpdate } from '../store/useAppStore'
import { useInterval } from '../hooks/useInterval'
import { useToast } from '../hooks/use-toast'
import { Toaster } from '../components/ui/toaster'
import { Trash2, AlertTriangle, Route, Calculator } from 'lucide-react'

export function Dashboard() {
  const { bins, organization, simulationPaused } = useAppStore()
  const { toast } = useToast()
  const [selectedTab, setSelectedTab] = useState('overview')

  // Calculate KPIs
  const avgFill = bins.length > 0 ? bins.reduce((sum, b) => sum + b.fill, 0) / bins.length : 0
  const binsFull = bins.filter((b) => b.status === 'critical').length
  const estTripsSaved = Math.max(0, 3 - Math.ceil(binsFull / 8))
  const estSavingsPerYear = estTripsSaved * 365 * 150 // Rough estimate

  // Live simulation
  useInterval(
    () => {
      simulateLiveUpdate((bin) => {
        toast({
          title: 'Bin Alert',
          description: `${bin.id} crossed 80% (critical)`,
          variant: 'destructive',
        })
      })
    },
    simulationPaused ? null : 10000
  )

  // Map center based on organization
  const mapCenter: [number, number] =
    organization === 'Columbia University'
      ? [40.8075, -73.9626]
      : [40.522, -74.459]
  const mapZoom = organization === 'Columbia University' ? 15 : 12

  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <Toaster />
      <div className="container mx-auto px-4 py-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
            <TabsTrigger value="bins">Bins</TabsTrigger>
            <TabsTrigger value="routes">Routes</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="roi">ROI</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <KpiTile
                label="Avg Fill %"
                value={Math.round(avgFill)}
                format="percent"
                icon={<Trash2 className="h-5 w-5" />}
              />
              <KpiTile
                label="Bins Full"
                value={binsFull}
                icon={<AlertTriangle className="h-5 w-5" />}
              />
              <KpiTile
                label="Est. Trips Saved/Day"
                value={estTripsSaved}
                icon={<Route className="h-5 w-5" />}
              />
              <KpiTile
                label="Est. $ Saved/Year"
                value={estSavingsPerYear}
                format="currency"
                icon={<Calculator className="h-5 w-5" />}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="h-[400px] rounded-lg border bg-card relative">
                <EnhancedMapView
                  bins={bins}
                  center={mapCenter}
                  zoom={mapZoom}
                  showPilotDetails={true}
                />
                <MarkerLegend />
              </div>
              <AlertsPanel />
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Map View</h3>
                <DateRangePicker />
              </div>
              <div className="h-[calc(100vh-250px)] rounded-lg border bg-card relative">
                <EnhancedMapView
                  bins={bins}
                  center={mapCenter}
                  zoom={mapZoom}
                  showPilotDetails={true}
                />
                <MarkerLegend />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bins" className="mt-6">
            <BinTable bins={bins} />
          </TabsContent>

          <TabsContent value="routes" className="mt-6">
            <RoutePanel />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <AnalyticsPanel />
          </TabsContent>

          <TabsContent value="roi" className="mt-6">
            <RoiPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


