import { NavLink } from 'react-router-dom'
import navigation from '../../data/navigation.json'

const navLinkClass = ({ isActive }) =>
  [
    'inline-flex items-center px-3 py-2 text-sm font-medium tracking-wide transition-colors',
    isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900',
  ].join(' ')

export default function MainNavigation() {
  return (
    <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
      {navigation.map((item) => (
        <NavLink key={item.href} to={item.href} className={navLinkClass} end={item.href === '/'}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
