import { useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface DateRangePickerProps {
  onRangeChange?: (range: { start: Date | null; end: Date | null }) => void
}

const presetRanges = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
  { label: 'Last year', days: 365 },
]

export function DateRangePicker({ onRangeChange }: DateRangePickerProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>('30')

  const handlePresetChange = (value: string) => {
    setSelectedPreset(value)
    if (value === 'custom') {
      // Custom date picker would go here
      return
    }

    const days = parseInt(value)
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - days)

    onRangeChange?.({ start, end })
  }

  return (
    <div className="flex items-center gap-2">
      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
      <Select value={selectedPreset} onValueChange={handlePresetChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select range" />
        </SelectTrigger>
        <SelectContent>
          {presetRanges.map((range) => (
            <SelectItem key={range.days} value={range.days.toString()}>
              {range.label}
            </SelectItem>
          ))}
          <SelectItem value="custom">Custom Range</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

