import SectionHeading from '../components/SectionHeading'
import { packages } from '../data/siteData'

export default function PricingPage() {
  return (
    <div className="space-y-12 py-8">
      <SectionHeading
        eyebrow="Pricing"
        title="Transparent packages for milestones, brands, and everyday stories."
        description="Every investment includes creative direction, delivery planning, and refined post-production."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {packages.map((item) => (
          <div
            key={item.name}
            className={[
              'rounded-[28px] border p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1',
              item.highlight === 'Most popular'
                ? 'border-rose-200 bg-gradient-to-b from-rose-50 to-white shadow-rose-100'
                : 'border-slate-200 bg-white',
            ].join(' ')}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-2xl font-semibold text-slate-900">{item.name}</h3>
              {item.highlight === 'Most popular' ? (
                <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
                  {item.highlight}
                </span>
              ) : null}
            </div>

            <div className="mt-5 text-4xl font-semibold tracking-tight text-slate-900">{item.price}</div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              {item.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-700">
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Choose package
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
