import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Moon, Sun } from 'lucide-react'
import MainNavigation from './MainNavigation'
import MobileNavigation from './MobileNavigation'

export default function SiteHeader({ theme, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#f7f5f0]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center transition hover:opacity-90" aria-label="Go to homepage">
          <img
            src="/images/swapna-logo.png"
            alt="Swapna Photo Studio logo"
            className="theme-logo h-12 w-auto rounded-lg bg-[#f7f5f0] p-1.5 shadow-sm sm:h-14"
          />
        </Link>

        <div className="flex items-center gap-3">
          <MainNavigation />
          <Link to="/booking" className="hidden min-h-10 items-center gap-2 bg-stone-900 px-4 text-xs font-semibold text-white transition hover:bg-stone-700 lg:inline-flex">
            Book a session <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-800 transition hover:bg-stone-200"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" aria-hidden="true" /> : <Sun className="h-4 w-4" aria-hidden="true" />}
          </button>
          <MobileNavigation isOpen={mobileOpen} onToggle={() => setMobileOpen((value) => !value)} />
        </div>
      </div>
    </header>
  )
}
