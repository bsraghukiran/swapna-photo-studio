import { useLayoutEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

export default function SiteLayout() {
  const [theme, setTheme] = useState(() => window.localStorage.getItem('swapna-theme') || 'light')

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem('swapna-theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-stone-900">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-3 focus:text-stone-900">
        Skip to main content
      </a>
      <SiteHeader theme={theme} onToggleTheme={() => setTheme((current) => current === 'light' ? 'dark' : 'light')} />
      <main id="main-content" tabIndex="-1" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
