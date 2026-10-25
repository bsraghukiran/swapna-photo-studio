export default function ServiceCard({ service }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">
          {service.badge}
        </span>
        <span className="text-sm font-medium text-slate-500">{service.duration}</span>
      </div>

      <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>

      <div className="mt-5 border-t border-slate-200 pt-5">
        <p className="text-lg font-semibold text-slate-900">{service.price}</p>
        <ul className="mt-4 space-y-2 text-sm text-slate-600">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
