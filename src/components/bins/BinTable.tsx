import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { StatBadge } from '../common/StatBadge'
import { formatDate, formatPercent } from '../../utils/format'
import type { Bin } from '../../types'

interface BinTableProps {
  bins: Bin[]
}

type SortField = 'id' | 'fill' | 'battery' | 'lastEmptied'
type SortDirection = 'asc' | 'desc'

export function BinTable({ bins }: BinTableProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [campusFilter, setCampusFilter] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>('id')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const filteredAndSorted = useMemo(() => {
    let filtered = bins.filter((bin) => {
      const matchesSearch =
        bin.id.toLowerCase().includes(search.toLowerCase()) ||
        bin.location.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || bin.status === statusFilter
      const matchesCampus =
        campusFilter === 'all' || !bin.campus || bin.campus === campusFilter

      return matchesSearch && matchesStatus && matchesCampus
    })

    filtered.sort((a, b) => {
      let aVal: any = a[sortField]
      let bVal: any = b[sortField]

      if (sortField === 'lastEmptied') {
        aVal = new Date(aVal).getTime()
        bVal = new Date(bVal).getTime()
      }

      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0
      } else {
        return aVal < bVal ? 1 : aVal > bVal ? -1 : 0
      }
    })

    return filtered
  }, [bins, search, statusFilter, campusFilter, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const campuses = useMemo(() => {
    const set = new Set(bins.map((b) => b.campus).filter((c): c is string => Boolean(c)))
    return Array.from(set)
  }, [bins])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bins</CardTitle>
        <div className="flex gap-4 mt-4">
          <Input
            placeholder="Search by ID or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
          {campuses.length > 0 && (
            <Select value={campusFilter} onValueChange={setCampusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by campus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campuses</SelectItem>
                {campuses.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th
                  className="text-left p-2 cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('id')}
                >
                  Bin ID {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="text-left p-2">Campus/Site</th>
                <th
                  className="text-left p-2 cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('fill')}
                >
                  Fill % {sortField === 'fill' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="text-left p-2 cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('battery')}
                >
                  Battery {sortField === 'battery' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="text-left p-2 cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('lastEmptied')}
                >
                  Last Emptied {sortField === 'lastEmptied' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSorted.map((bin) => (
                <tr key={bin.id} className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">{bin.id}</td>
                  <td className="p-2 text-sm text-muted-foreground">
                    {bin.campus || bin.location}
                  </td>
                  <td className="p-2">{formatPercent(bin.fill)}</td>
                  <td className="p-2">{bin.battery}%</td>
                  <td className="p-2 text-sm text-muted-foreground">
                    {formatDate(bin.lastEmptied)}
                  </td>
                  <td className="p-2">
                    <StatBadge status={bin.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAndSorted.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No bins found matching your filters.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}


