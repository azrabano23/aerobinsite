import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useAppStore } from '../../store/useAppStore'
import { formatDate } from '../../utils/format'
import { StatBadge } from './StatBadge'
import { useInterval } from '../../hooks/useInterval'
import { useState } from 'react'

export function LivePeek() {
  const { bins } = useAppStore()
  const [displayedBins, setDisplayedBins] = useState(() => {
    const critical = bins.filter((b) => b.status === 'critical')
    const warning = bins.filter((b) => b.status === 'warning')
    const all = [...critical, ...warning, ...bins].slice(0, 2)
    return all
  })

  useInterval(() => {
    const critical = bins.filter((b) => b.status === 'critical')
    const warning = bins.filter((b) => b.status === 'warning')
    const all = [...critical, ...warning, ...bins].slice(0, 2)
    setDisplayedBins(all)
  }, 5000)

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Live Peek</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <AnimatePresence mode="wait">
          {displayedBins.map((bin, idx) => (
            <motion.div
              key={`${bin.id}-${idx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{bin.id}</span>
                  <StatBadge status={bin.status} />
                </div>
                <p className="text-xs text-muted-foreground">{bin.location}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {bin.fill}% full • {formatDate(bin.lastEmptied)}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}


