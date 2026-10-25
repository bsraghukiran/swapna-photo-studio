import { Link } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'

export default function NotFound() {
  return (
    <>
      <SEOHead title="Page not found" description="The page you requested could not be found." pathname="/404" indexable={false} />
      <section className="flex min-h-[55vh] flex-col items-center justify-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">This page is not here.</h1>
        <p className="mt-4 max-w-xl text-lg text-slate-600">The link may be outdated, or the page may have moved.</p>
        <Link to="/" className="mt-8 inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700">
          Return home
        </Link>
      </section>
    </>
  )
}
