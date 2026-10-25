export default function ServiceCard({ service }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <img src={service.image} alt={`Image reference for ${service.name}`} className="h-auto w-full" loading="lazy" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-900">{service.name}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
      </div>
    </article>
  )
}
