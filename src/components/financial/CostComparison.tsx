import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { formatCurrency } from '../../utils/format'
import { ArrowRight, TrendingDown } from 'lucide-react'

export function CostComparison() {
  return (
    <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-2 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Cost Comparison: AeroBin vs Traditional</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional Solution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold">Traditional Solution</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Smart Bin Unit Cost</span>
                <span className="text-lg font-semibold text-red-500">{formatCurrency(1500)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Installation Complexity</span>
                <span className="text-lg font-semibold">High</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Maintenance Cost/Year</span>
                <span className="text-lg font-semibold">{formatCurrency(300)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">ROI Period</span>
                <span className="text-lg font-semibold">3-5 years</span>
              </div>
            </div>
          </motion.div>

          {/* AeroBin Solution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-emerald-500 rotate-180" />
              </div>
              <h3 className="text-xl font-bold">AeroBin Solution</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-emerald-500/10 rounded-lg border-2 border-emerald-500/30">
                <span className="text-sm text-muted-foreground">Clip-on Sensor Cost</span>
                <span className="text-lg font-semibold text-emerald-500">{formatCurrency(100)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-emerald-500/10 rounded-lg border-2 border-emerald-500/30">
                <span className="text-sm text-muted-foreground">Installation Time</span>
                <span className="text-lg font-semibold text-emerald-500">&lt;60 seconds</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-emerald-500/10 rounded-lg border-2 border-emerald-500/30">
                <span className="text-sm text-muted-foreground">Maintenance Cost/Year</span>
                <span className="text-lg font-semibold text-emerald-500">{formatCurrency(50)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-emerald-500/10 rounded-lg border-2 border-emerald-500/30">
                <span className="text-sm text-muted-foreground">ROI Period</span>
                <span className="text-lg font-semibold text-emerald-500">6-12 months</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Savings Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 p-6 rounded-lg border-2 border-emerald-500/30"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Cost Savings per Unit</p>
              <p className="text-3xl font-bold text-emerald-500">
                {formatCurrency(1400)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                93% cost reduction vs traditional smart bins
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">For 150 bins</p>
              <p className="text-2xl font-bold text-emerald-500">
                {formatCurrency(210000)}
              </p>
              <p className="text-xs text-muted-foreground mt-2">Initial investment savings</p>
            </div>
          </div>
        </motion.div>

        {/* Arrow Animation */}
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Traditional</p>
            <div className="text-2xl font-bold text-red-500">{formatCurrency(1500)}</div>
          </div>
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowRight className="h-8 w-8 text-emerald-500" />
          </motion.div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">AeroBin</p>
            <div className="text-2xl font-bold text-emerald-500">{formatCurrency(100)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

