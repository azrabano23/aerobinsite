import type { Bin } from '../types'

/**
 * Generate a random number between min and max
 */
export function random(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

/**
 * Generate a random integer between min and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Randomly nudge a bin's fill percentage
 * Returns new fill value (0-100)
 */
export function nudgeBinFill(bin: Bin): Bin {
  const change = randomInt(-3, 3)
  const newFill = Math.max(0, Math.min(100, bin.fill + change))
  
  // Update status based on new fill
  let status: Bin['status'] = 'normal'
  if (newFill > 80) {
    status = 'critical'
  } else if (newFill >= 40) {
    status = 'warning'
  } else if (bin.status === 'offline') {
    status = 'offline'
  }

  return {
    ...bin,
    fill: newFill,
    status,
  }
}

/**
 * Check if bin crossed a threshold (40% or 80%)
 */
export function crossedThreshold(oldBin: Bin, newBin: Bin): {
  crossed: boolean
  threshold: number | null
  direction: 'up' | 'down' | null
} {
  const thresholds = [40, 80]
  for (const threshold of thresholds) {
    if (oldBin.fill < threshold && newBin.fill >= threshold) {
      return { crossed: true, threshold, direction: 'up' }
    }
    if (oldBin.fill >= threshold && newBin.fill < threshold) {
      return { crossed: true, threshold, direction: 'down' }
    }
  }
  return { crossed: false, threshold: null, direction: null }
}

/**
 * Generate ISO timestamp within last N hours
 */
export function randomTimestamp(hoursAgo: number = 72): string {
  const now = Date.now()
  const hoursAgoMs = hoursAgo * 60 * 60 * 1000
  const randomTime = now - randomInt(0, hoursAgoMs)
  return new Date(randomTime).toISOString()
}


