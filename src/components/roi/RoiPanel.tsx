import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { formatCurrency } from '../../utils/format'

export function RoiPanel() {
  const [numBins, setNumBins] = useState(150)
  const [costPerBin, setCostPerBin] = useState(100)
  const [laborCostPerHour, setLaborCostPerHour] = useState(25)
  const [avgPickupsPerDay, setAvgPickupsPerDay] = useState(3)
  const [avgRouteDistance, setAvgRouteDistance] = useState(18)
  const [fuelCostPerGallon, setFuelCostPerGallon] = useState(3.7)
  const [vehicleKmPerGallon, setVehicleKmPerGallon] = useState(6.5)

  const calculations = useMemo(() => {
    // Baseline costs (without smart sensors)
    const baselinePickupsPerDay = avgPickupsPerDay
    const baselineHoursPerDay = (baselinePickupsPerDay * avgRouteDistance) / 20 // 20 km/h
    const baselineLaborCostPerDay = baselineHoursPerDay * laborCostPerHour
    const baselineFuelPerDay = (baselinePickupsPerDay * avgRouteDistance) / vehicleKmPerGallon
    const baselineFuelCostPerDay = baselineFuelPerDay * fuelCostPerGallon
    const baselineDailyCost = baselineLaborCostPerDay + baselineFuelCostPerDay

    // With smart sensors (assume 30% reduction in pickups)
    const optimizedPickupsPerDay = baselinePickupsPerDay * 0.7
    const optimizedHoursPerDay = (optimizedPickupsPerDay * avgRouteDistance) / 20
    const optimizedLaborCostPerDay = optimizedHoursPerDay * laborCostPerHour
    const optimizedFuelPerDay = (optimizedPickupsPerDay * avgRouteDistance) / vehicleKmPerGallon
    const optimizedFuelCostPerDay = optimizedFuelPerDay * fuelCostPerGallon
    const optimizedDailyCost = optimizedLaborCostPerDay + optimizedFuelCostPerDay

    const dailySavings = baselineDailyCost - optimizedDailyCost
    const annualSavings = dailySavings * 365
    const initialInvestment = numBins * costPerBin
    const breakevenMonths = initialInvestment / (dailySavings * 30)

    // 3-year projection
    const projection = []
    let cumulative = -initialInvestment
    for (let month = 0; month <= 36; month++) {
      if (month > 0) {
        cumulative += dailySavings * 30
      }
      projection.push({
        month: `M${month}`,
        value: cumulative,
        label: month === 0 ? 'Initial' : month % 6 === 0 ? `${month}m` : '',
      })
    }

    return {
      dailySavings,
      annualSavings,
      initialInvestment,
      breakevenMonths,
      projection,
    }
  }, [
    numBins,
    costPerBin,
    laborCostPerHour,
    avgPickupsPerDay,
    avgRouteDistance,
    fuelCostPerGallon,
    vehicleKmPerGallon,
  ])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>ROI Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Number of Bins</Label>
            <Input
              type="number"
              value={numBins}
              onChange={(e) => setNumBins(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Cost per Bin ($)</Label>
            <Input
              type="number"
              value={costPerBin}
              onChange={(e) => setCostPerBin(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Labor Cost per Hour ($)</Label>
            <Input
              type="number"
              value={laborCostPerHour}
              onChange={(e) => setLaborCostPerHour(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Avg Pickups per Day (Baseline)</Label>
            <Input
              type="number"
              value={avgPickupsPerDay}
              onChange={(e) => setAvgPickupsPerDay(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Avg Route Distance (km)</Label>
            <Input
              type="number"
              value={avgRouteDistance}
              onChange={(e) => setAvgRouteDistance(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Fuel Cost per Gallon ($)</Label>
            <Input
              type="number"
              step="0.1"
              value={fuelCostPerGallon}
              onChange={(e) => setFuelCostPerGallon(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Vehicle km per Gallon</Label>
            <Input
              type="number"
              step="0.1"
              value={vehicleKmPerGallon}
              onChange={(e) => setVehicleKmPerGallon(Number(e.target.value))}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Daily Savings</p>
              <motion.p
                className="text-3xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={calculations.dailySavings}
              >
                {formatCurrency(calculations.dailySavings)}
              </motion.p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Annual Savings</p>
              <motion.p
                className="text-3xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={calculations.annualSavings}
              >
                {formatCurrency(calculations.annualSavings)}
              </motion.p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>3-Year Projection</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={calculations.projection}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(label) => `Month ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                />
                <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="3 3" />
                {calculations.breakevenMonths <= 36 && (
                  <ReferenceLine
                    x={`M${Math.ceil(calculations.breakevenMonths)}`}
                    stroke="#f59e0b"
                    strokeDasharray="3 3"
                    label={{ value: 'Breakeven', position: 'top' }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>
                Initial Investment: {formatCurrency(calculations.initialInvestment)}
              </p>
              <p>
                Breakeven: {calculations.breakevenMonths <= 36
                  ? `${Math.ceil(calculations.breakevenMonths)} months`
                  : 'Beyond 3 years'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

