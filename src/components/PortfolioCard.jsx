export default function PortfolioCard({ item }) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
      <div className="overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          style={{ aspectRatio: item.aspect }}
          className="h-auto w-full"
        />
      </div>
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
          <p className="text-sm text-slate-500">{item.category}</p>
        </div>
        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
          Featured
        </span>
      </div>
    </article>
  )
}
