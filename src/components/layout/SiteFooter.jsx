import { ArrowUpRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import site from '../../data/site.json'
import navigation from '../../data/navigation.json'

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-stone-950 text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/images/swapna-logo.png"
              alt="Swapna Photo Studio logo"
              className="theme-logo h-12 w-auto rounded-lg bg-[#f7f5f0] p-1.5 shadow-sm sm:h-14"
            />
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">{site.description}</p>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex max-w-md items-start gap-2 text-sm leading-6 text-slate-300 transition hover:text-white"
            aria-label="Get directions to Swapna Photo Studio"
          >
            <MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{site.address.display}</span>
          </a>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Explore</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Have a story in mind?</h3>
          <p className="mt-4 max-w-xs text-sm leading-7 text-slate-300">Tell us a little about it and we’ll help you find the right photography experience.</p>
          <Link to="/booking" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-stone-300">
            Start an enquiry <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-slate-400 sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Photography & visual storytelling</span>
        </div>
      </div>
    </footer>
  )
}
