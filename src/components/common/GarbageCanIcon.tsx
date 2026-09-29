import { motion } from 'framer-motion'

interface GarbageCanIconProps {
  fill?: number // 0-100
  status?: 'normal' | 'warning' | 'critical'
  size?: number
  animated?: boolean
}

export function GarbageCanIcon({ fill = 50, status = 'normal', size = 80, animated = false }: GarbageCanIconProps) {
  const fillHeight = (fill / 100) * 60
  const colors = {
    normal: '#10b981',
    warning: '#f59e0b',
    critical: '#ef4444',
  }
  const fillColor = colors[status]

  const CanSVG = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Can body */}
      <rect x="20" y="30" width="40" height="60" rx="4" fill="currentColor" className="text-muted" />
      {/* Can lid */}
      <rect x="15" y="25" width="50" height="8" rx="2" fill="currentColor" className="text-muted-foreground" />
      {/* Lid handle */}
      <rect x="35" y="20" width="10" height="6" rx="1" fill="currentColor" className="text-muted-foreground" />
      {/* Fill level */}
      <rect
        x="22"
        y={90 - fillHeight}
        width="36"
        height={fillHeight}
        rx="2"
        fill={fillColor}
        opacity="0.8"
      />
      {/* Fill indicator line */}
      <line
        x1="22"
        y1={90 - fillHeight}
        x2="58"
        y2={90 - fillHeight}
        stroke={fillColor}
        strokeWidth="2"
        opacity="0.9"
      />
    </svg>
  )

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        {CanSVG}
      </motion.div>
    )
  }

  return CanSVG
}

