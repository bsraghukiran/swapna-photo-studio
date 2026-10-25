import { Menu, X } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import navigation from '../../data/navigation.json'

export default function MobileNavigation({ isOpen, onToggle }) {
  useEffect(() => {
    if (!isOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onToggle()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onToggle])

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={onToggle}
        className="rounded-full border border-stone-300 p-2 text-stone-800"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen ? (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="absolute inset-x-4 top-full mt-4 border border-stone-300 bg-[#f7f5f0] p-4 shadow-lg">
          <div className="flex flex-col gap-2">
            {navigation.map((item) => (
              <Link key={item.href} to={item.href} onClick={onToggle} className="px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-950">
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </div>
  )
}
