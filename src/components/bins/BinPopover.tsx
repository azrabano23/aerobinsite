import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { StatBadge } from '../common/StatBadge'
import { Progress } from '../ui/progress'
import { formatDate, formatPercent } from '../../utils/format'
import type { Bin } from '../../types'

interface BinPopoverProps {
  bin: Bin
  onClose?: () => void
}

export function BinPopover({ bin }: BinPopoverProps) {
  return (
    <Card className="w-80 bg-card/95 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{bin.id}</CardTitle>
          <StatBadge status={bin.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Location</p>
          <p className="text-sm font-medium">{bin.location}</p>
          {bin.campus && (
            <p className="text-xs text-muted-foreground mt-1">{bin.campus}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Fill Level</p>
            <p className="text-sm font-medium">{formatPercent(bin.fill)}</p>
          </div>
          <Progress value={bin.fill} className="h-2" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Battery</p>
            <p className="text-sm font-medium">{bin.battery}%</p>
          </div>
          <Progress value={bin.battery} className="h-2" />
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-1">Last Emptied</p>
          <p className="text-sm font-medium">{formatDate(bin.lastEmptied)}</p>
        </div>
      </CardContent>
    </Card>
  )
}


