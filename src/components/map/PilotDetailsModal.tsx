import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Card, CardContent } from '../ui/card'
import { formatPercent } from '../../utils/format'

interface PilotDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  organization: 'Columbia University' | 'Rutgers University'
}

const columbiaPilotData = {
  dateStarted: 'June 2025',
  numBins: 40,
  avgFillReduction: 31,
  tripsReduced: '32%',
  costSavings: '$45K/year',
  campus: 'Morningside Heights',
  locations: ['Low Library Plaza', 'Butler Library', 'College Walk', 'Lerner Hall'],
}

const rutgersPilotData = {
  dateStarted: 'Q1 2026 (Upcoming)',
  numBins: 150,
  avgFillReduction: 28,
  tripsReduced: '35%',
  costSavings: '$225K/year',
  campus: 'New Brunswick - 5 Sites',
  locations: ['College Avenue', 'Busch', 'Cook', 'Livingston', 'Douglass'],
}

export function PilotDetailsModal({ open, onOpenChange, organization }: PilotDetailsModalProps) {
  const data = organization === 'Columbia University' ? columbiaPilotData : rutgersPilotData

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pr-8">
          <DialogTitle className="text-2xl">
            Pilot Details: {organization}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Date Started</p>
                <p className="text-lg font-semibold">{data.dateStarted}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Number of Bins</p>
                <p className="text-lg font-semibold">{data.numBins}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Avg Fill Reduction</p>
                <p className="text-lg font-semibold text-emerald-500">
                  {formatPercent(data.avgFillReduction)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Trips Reduced</p>
                <p className="text-lg font-semibold text-emerald-500">{data.tripsReduced}</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-2">Annual Cost Savings</p>
              <p className="text-3xl font-bold text-emerald-500">{data.costSavings}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-2">Campus Coverage</p>
              <p className="text-base font-medium">{data.campus}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.locations.map((loc) => (
                  <span
                    key={loc}
                    className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground"
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

