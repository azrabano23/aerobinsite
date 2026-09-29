import { Card, CardContent } from '../ui/card'

export function MarkerLegend() {
  return (
    <Card className="absolute bottom-4 right-4 z-[500] bg-background/95 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold mb-2">Status</p>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
            <span>Normal (&lt;40%)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-amber-500"></div>
            <span>Warning (40-80%)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span>Critical (&gt;80%)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-gray-500"></div>
            <span>Offline</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


