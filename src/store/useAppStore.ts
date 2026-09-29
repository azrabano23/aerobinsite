import { create } from 'zustand'
import type { Bin, Organization, RutgersCampus } from '../types'
import columbiaData from '../data/columbia.json'
import rutgersData from '../data/rutgers.json'
import { nudgeBinFill, crossedThreshold } from '../utils/faker'

interface AppState {
  // Organization & Campus
  organization: Organization
  campus: RutgersCampus | null
  setOrganization: (org: Organization) => void
  setCampus: (campus: RutgersCampus | null) => void

  // Bins data
  bins: Bin[]
  updateBin: (id: string, updates: Partial<Bin>) => void
  loadBins: () => void

  // Simulation
  simulationPaused: boolean
  toggleSimulation: () => void

  // Alerts
  dismissedAlerts: Set<string>
  dismissAlert: (binId: string) => void

  // Route
  selectedRoute: 'manual' | 'ai' | null
  setSelectedRoute: (route: 'manual' | 'ai' | null) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  organization: 'Columbia University',
  campus: null,
  setOrganization: (org) => {
    set({ organization: org, campus: org === 'Rutgers University' ? 'All sites' : null })
    get().loadBins()
  },
  setCampus: (campus) => {
    set({ campus })
    get().loadBins()
  },

  bins: [],
  updateBin: (id, updates) => {
    set((state) => ({
      bins: state.bins.map((bin) => (bin.id === id ? { ...bin, ...updates } : bin)),
    }))
  },
  loadBins: () => {
    const { organization, campus } = get()
    let allBins: Bin[] = []

    if (organization === 'Columbia University') {
      allBins = columbiaData as Bin[]
    } else {
      allBins = rutgersData as Bin[]
      if (campus && campus !== 'All sites') {
        allBins = allBins.filter((bin) => bin.campus === campus)
      }
    }

    set({ bins: allBins })
  },

  simulationPaused: false,
  toggleSimulation: () => {
    set((state) => ({ simulationPaused: !state.simulationPaused }))
  },

  dismissedAlerts: new Set(),
  dismissAlert: (binId) => {
    set((state) => {
      const newDismissed = new Set(state.dismissedAlerts)
      newDismissed.add(binId)
      return { dismissedAlerts: newDismissed }
    })
  },

  selectedRoute: null,
  setSelectedRoute: (route) => set({ selectedRoute: route }),
}))

// Initialize bins on store creation
useAppStore.getState().loadBins()

// Live simulation function (called from component)
export function simulateLiveUpdate(onThresholdCrossed?: (bin: Bin, oldBin: Bin) => void) {
  const state = useAppStore.getState()
  if (state.simulationPaused) return

  const bins = state.bins
  const numToUpdate = Math.min(5, Math.max(1, Math.floor(bins.length * 0.1)))
  const indices = new Set<number>()
  while (indices.size < numToUpdate) {
    indices.add(Math.floor(Math.random() * bins.length))
  }

  indices.forEach((idx) => {
    const oldBin = bins[idx]
    const newBin = nudgeBinFill(oldBin)
    state.updateBin(oldBin.id, newBin)

    const threshold = crossedThreshold(oldBin, newBin)
    if (threshold.crossed && threshold.direction === 'up' && threshold.threshold === 80) {
      onThresholdCrossed?.(newBin, oldBin)
    }
  })
}


