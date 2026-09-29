import { motion } from 'framer-motion'
import { Card, CardContent } from '../ui/card'
import { formatNumber, formatCurrency } from '../../utils/format'

interface KpiTileProps {
  label: string
  value: number | string
  unit?: string
  trend?: number
  format?: 'number' | 'currency' | 'percent'
  icon?: React.ReactNode
}

export function KpiTile({ label, value, unit, trend, format, icon }: KpiTileProps) {
  const displayValue =
    format === 'currency'
      ? formatCurrency(Number(value))
      : format === 'percent'
        ? `${value}%`
        : format === 'number'
          ? formatNumber(Number(value))
          : value

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{label}</p>
              <div className="flex items-baseline gap-2">
                <motion.p
                  className="text-3xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {displayValue}
                </motion.p>
                {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
              </div>
              {trend !== undefined && (
                <p
                  className={`text-xs ${
                    trend >= 0 ? 'text-emerald-500' : 'text-red-500'
                  }`}
                >
                  {trend >= 0 ? '+' : ''}
                  {trend.toFixed(1)}% vs last week
                </p>
              )}
            </div>
            {icon && <div className="text-muted-foreground">{icon}</div>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}


