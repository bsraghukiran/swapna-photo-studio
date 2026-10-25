import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import { services } from '../data/siteData'

export default function ServicesPage() {
  return (
    <div className="space-y-12 py-8">
      <SectionHeading
        eyebrow="Our services"
        title="Photography and videography experiences crafted with intention."
        description="Whether you are celebrating a milestone, telling your brand story, or preserving family memories, we design a session around your goals."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      <div className="rounded-[30px] border border-slate-200 bg-slate-900 p-8 text-white shadow-xl shadow-slate-200/70">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Process</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight">Simple, thoughtful, and stress-free.</h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['01', 'Discovery call'],
              ['02', 'Creative planning'],
              ['03', 'Delivery & gallery'],
            ].map(([step, label]) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="text-2xl font-semibold text-amber-300">{step}</div>
                <div className="mt-2 text-sm text-slate-300">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
