export default function PortfolioCard({ item }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <img
        src={item.image}
        alt={item.alt || item.title}
        style={{ aspectRatio: item.aspect }}
        className="h-auto w-full"
        loading="lazy"
      />
      <div className="p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">{item.category}</div>
        <h3 className="mt-2 text-xl font-semibold text-slate-900">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{item.caption}</p>
      </div>
    </article>
  )
}
