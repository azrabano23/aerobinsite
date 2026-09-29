import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useAppStore } from '../../store/useAppStore'

const COLORS = {
  normal: '#10b981',
  warning: '#f59e0b',
  critical: '#ef4444',
  offline: '#6b7280',
}

export function AnalyticsPanel() {
  const { bins } = useAppStore()

  const fillDistribution = useMemo(() => {
    const normal = bins.filter((b) => b.status === 'normal').length
    const warning = bins.filter((b) => b.status === 'warning').length
    const critical = bins.filter((b) => b.status === 'critical').length
    const offline = bins.filter((b) => b.status === 'offline').length

    return [
      { name: 'Normal', value: normal, color: COLORS.normal },
      { name: 'Warning', value: warning, color: COLORS.warning },
      { name: 'Critical', value: critical, color: COLORS.critical },
      { name: 'Offline', value: offline, color: COLORS.offline },
    ]
  }, [bins])

  const overflowIncidents = useMemo(() => {
    const days = 30
    return Array.from({ length: days }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (days - i - 1))
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        incidents: Math.floor(Math.random() * 5) + (i > 20 ? 0 : 2),
      }
    })
  }, [])

  const pickupsComparison = useMemo(() => {
    return [
      { period: 'Week 1', before: 21, after: 18 },
      { period: 'Week 2', before: 22, after: 16 },
      { period: 'Week 3', before: 20, after: 15 },
      { period: 'Week 4', before: 23, after: 17 },
    ]
  }, [])

  const co2Saved = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - (11 - i))
      return {
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        co2: Math.floor(Math.random() * 50) + 100 + i * 10,
      }
    })
  }, [])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Fill Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fillDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fillDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overflow Incidents (30 days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={overflowIncidents}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="incidents" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Pickups per Week (Before vs After)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pickupsComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="before" fill="#6b7280" name="Before" />
                <Bar dataKey="after" fill="#10b981" name="After" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CO₂ Saved (kg)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={co2Saved}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="co2" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


