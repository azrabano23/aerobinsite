import { Badge } from '../ui/badge'
import type { Bin } from '../../types'

interface StatBadgeProps {
  status: Bin['status']
  children?: React.ReactNode
}

export function StatBadge({ status, children }: StatBadgeProps) {
  const variants = {
    normal: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    critical: 'bg-red-500/20 text-red-400 border-red-500/30',
    offline: 'bg-gray-500/20 text-gray-400 border-gray-500/30 opacity-50',
  }

  return (
    <Badge variant="outline" className={variants[status]}>
      {children || status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}


