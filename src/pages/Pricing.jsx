import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/common/PageHero'
import SEOHead from '../components/seo/SEOHead'
import { packages } from '../data/siteData'

export default function Pricing() {
  return (
    <>
      <SEOHead title="Packages & pricing" description="Explore custom photography package options for weddings, portraits, and brand stories." pathname="/pricing" />
      <PageHero eyebrow="Packages" title="A thoughtful plan for the story you have in mind." description="Every project is different. Explore the starting points below, then request a tailored written quote." />

      <p className="max-w-3xl border-l-2 border-amber-700 pl-4 text-sm leading-6 text-stone-600">
        Pricing and specific deliverables have not been supplied. No prices or guaranteed inclusions are published here; confirm the final scope directly with the studio before booking.
      </p>
      <section className="grid gap-6 py-8 lg:grid-cols-3">
        {packages.map((pkg) => (
          <article key={pkg.name} className="border border-stone-300 bg-[#fbfaf7] p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">{pkg.highlight}</div>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">{pkg.name}</h2>
            <div className="editorial-serif mt-4 text-3xl text-stone-900">{pkg.price}</div>
            <p className="mt-4 text-sm leading-7 text-slate-600">{pkg.description}</p>

            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link to="/booking" className="mt-8 inline-flex w-full items-center justify-center bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-700">
              Ask about this option
            </Link>
          </article>
        ))}
      </section>

      <section className="py-14">
        <div className="border-t border-stone-300 py-8">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Custom quotes available</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Need a different date range, extra coverage, or a specialized mood board? We create tailored packages for weddings, brands, and editorial stories.
          </p>
          <Link to="/contact" className="mt-6 inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400">
            Ask for a custom plan
          </Link>
        </div>
      </section>
    </>
  )
}
