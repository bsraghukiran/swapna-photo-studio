export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="border-b border-stone-300 py-12 sm:py-16">
      <div className="max-w-4xl">
        {eyebrow ? (
          <p className="eyebrow mb-4">{eyebrow}</p>
        ) : null}
        <h1 className="editorial-serif text-5xl leading-[1.05] text-stone-900 sm:text-6xl">{title}</h1>
        {description ? <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">{description}</p> : null}
      </div>
    </section>
  )
}
