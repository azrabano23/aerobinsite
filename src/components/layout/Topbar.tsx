import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useAppStore } from '../../store/useAppStore'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import type { Organization, RutgersCampus } from '../../types'
import logoImage from '../../assets/icons/logo.png'

export function Topbar() {
  const navigate = useNavigate()
  const { organization, campus, setOrganization, setCampus } = useAppStore()
  const [darkMode] = useLocalStorage('darkMode', true)

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const rutgersCampuses: RutgersCampus[] = [
    'All sites',
    'College Avenue',
    'Busch',
    'Cook',
    'Livingston',
    'Douglass',
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Go to home page"
          >
            <img 
              src={logoImage} 
              alt="AeroBin Logo" 
              className="h-12 w-auto object-contain max-h-14"
            />
          </button>

          <div className="flex items-center gap-4">
            <Select value={organization} onValueChange={(v) => setOrganization(v as Organization)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Columbia University">Columbia University</SelectItem>
                <SelectItem value="Rutgers University">Rutgers University</SelectItem>
              </SelectContent>
            </Select>

            {organization === 'Rutgers University' && (
              <Select
                value={campus || 'All sites'}
                onValueChange={(v) => setCampus(v as RutgersCampus)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {rutgersCampuses.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

