import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { StatBadge } from '../common/StatBadge'
import { formatDate, formatPercent } from '../../utils/format'
import { useAppStore } from '../../store/useAppStore'

export function AlertsPanel() {
  const { bins, dismissedAlerts, dismissAlert } = useAppStore()

  const criticalBins = bins
    .filter((bin) => bin.status === 'critical' && !dismissedAlerts.has(bin.id))
    .sort((a, b) => b.fill - a.fill)

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Alerts</CardTitle>
        <p className="text-sm text-muted-foreground">
          Bins with fill level above 80% ({criticalBins.length} active)
        </p>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto pr-2 space-y-3 scrollbar-thin">
          <AnimatePresence>
            {criticalBins.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No active alerts. All bins are operating normally.
              </div>
            ) : (
              criticalBins.map((bin) => (
                <motion.div
                  key={bin.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/15 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-sm">{bin.id}</span>
                      <StatBadge status={bin.status} />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1 truncate">{bin.location}</p>
                    <div className="flex items-center gap-4 text-sm flex-wrap">
                      <span className="font-medium text-red-400 whitespace-nowrap">
                        {formatPercent(bin.fill)} full
                      </span>
                      <span className="text-muted-foreground text-xs">
                        Last emptied: {formatDate(bin.lastEmptied)}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dismissAlert(bin.id)}
                    className="ml-4 flex-shrink-0 h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}


