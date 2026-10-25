import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import WatermarkedPhoto from '../components/common/WatermarkedPhoto'
import SEOHead from '../components/seo/SEOHead'
import site from '../data/site.json'
import home from '../data/home.json'
import portfolio from '../data/portfolio.json'
import services from '../data/services.json'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Home() {
  const shouldReduceMotion = useReducedMotion()
  const featuredServices = services.services.filter((service) =>
    home.featuredServices.includes(service.name),
  )

  return (
    <>
      <SEOHead
        title={home.meta.title}
        description={home.meta.description}
        pathname="/"
        image={site.defaultOgImage}
      />

      <section className="relative isolate -mx-4 -mt-8 overflow-hidden bg-[#27251f] sm:-mx-6 lg:-mx-8">
        <WatermarkedPhoto
          src={home.hero.primaryImage}
          alt="Couple relaxing together on a wooden pier during a pre-wedding session"
          width="1600"
          height="1100"
          fetchPriority="high"
          containerPosition="absolute"
          containerClassName="inset-0"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />
        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          animate="show"
          variants={fadeUp}
          className="relative z-20 mx-auto flex min-h-[660px] max-w-6xl flex-col items-start justify-center px-6 py-24 text-white sm:px-10 lg:min-h-[760px] lg:px-8"
        >
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/75">
            {home.hero.eyebrow}
          </p>
          <h1 className="editorial-serif mt-6 max-w-3xl text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">
            {home.hero.title}
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
            {home.hero.description}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/booking"
              className="inline-flex min-h-12 items-center gap-2 bg-white px-6 text-sm font-semibold text-stone-950 transition hover:bg-stone-100 focus-visible:outline-white"
            >
              Enquire about a session <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex min-h-12 items-center gap-2 border border-white/60 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore the portfolio
            </Link>
          </div>
          <a href="#studio" className="mt-16 inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/75">
            Discover the studio <ArrowDown className="h-4 w-4" />
          </a>
        </motion.div>
      </section>

      <section id="studio" className="grid gap-10 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'show'}
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
        >
          <p className="eyebrow">A little about us</p>
          <h2 className="editorial-serif mt-5 max-w-lg text-4xl leading-tight text-stone-900 sm:text-5xl">
            {home.intro.title}
          </h2>
          <p className="mt-6 max-w-lg text-base leading-8 text-stone-600">{home.intro.body}</p>
          <Link to="/about" className="text-link mt-7 inline-flex items-center gap-2">
            Get to know the studio <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative ml-auto w-full max-w-2xl"
        >
          <WatermarkedPhoto
            src={home.hero.secondaryImage}
            alt="Close-up of a wedding couple holding hands"
            loading="lazy"
            className="h-auto max-h-[680px] w-full"
          />
          <span className="absolute -bottom-5 -left-5 hidden border border-stone-300 bg-[#f7f5f0] px-5 py-4 text-xs uppercase tracking-[0.18em] text-stone-600 sm:block">
            Made with care, from first frame to final gallery
          </span>
        </motion.div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="flex flex-col justify-between gap-6 border-b border-stone-300 pb-7 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">The way we see it</p>
            <h2 className="editorial-serif mt-4 text-4xl text-stone-900 sm:text-5xl">Photography for every chapter.</h2>
          </div>
          <Link to="/services" className="text-link inline-flex items-center gap-2">
            All services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-x-8 md:grid-cols-2">
          {featuredServices.map((service, index) => (
            <Link
              key={service.slug}
              to="/services"
              className="group grid grid-cols-[72px_1fr_auto] items-center gap-4 border-b border-stone-300 py-6"
            >
              <span className="text-sm text-stone-400">0{index + 1}</span>
              <span>
                <span className="editorial-serif block text-2xl text-stone-900 transition group-hover:translate-x-1">{service.name}</span>
                <span className="mt-2 block max-w-md text-sm leading-6 text-stone-500">{service.description}</span>
              </span>
              <ArrowUpRight className="h-5 w-5 text-stone-500 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      <section className="-mx-4 bg-[#eae6dd] px-4 py-16 sm:-mx-6 sm:px-6 sm:py-24 lg:-mx-8 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Selected frames</p>
              <h2 className="editorial-serif mt-4 text-4xl text-stone-900 sm:text-5xl">A collection of moments.</h2>
            </div>
            <Link to="/portfolio" className="text-link inline-flex items-center gap-2">
              Browse the portfolio <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-6 text-stone-600">
            A selection from the studio’s wedding, portrait, family, and celebration galleries.
          </p>
          <div className="mt-9 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {portfolio.items.slice(0, 6).map((item) => (
              <Link
                to="/portfolio"
                key={item.title}
                className="group relative mb-4 inline-block w-full overflow-hidden break-inside-avoid"
              >
                <WatermarkedPhoto
                  src={item.image}
                  alt={item.alt || ''}
                  loading="lazy"
                  style={{ aspectRatio: item.aspect }}
                  className="h-auto w-full transition duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-5 pb-5 pr-24 pt-16 text-white">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-white/75">{item.category}</span>
                  <span className="editorial-serif mt-1 block text-2xl">{item.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">A considered process</p>
          <h2 className="editorial-serif mt-4 text-4xl leading-tight text-stone-900 sm:text-5xl">From the first hello to the final frame.</h2>
        </div>
        <div className="grid gap-x-8 sm:grid-cols-2">
          {[
            ['01', 'A conversation', 'We learn what matters to you and what you hope to remember.'],
            ['02', 'Thoughtful planning', 'Together we shape the timing, location, and feel of your session.'],
            ['03', 'A relaxed shoot', 'Gentle direction leaves room for real connection and unplanned moments.'],
            ['04', 'A considered edit', 'Your images are carefully selected and prepared as a cohesive gallery.'],
          ].map(([number, title, description]) => (
            <article key={number} className="border-t border-stone-300 py-5">
              <span className="text-xs tracking-[0.2em] text-stone-400">{number}</span>
              <h3 className="editorial-serif mt-3 text-2xl text-stone-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 py-20 sm:py-28 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <p className="eyebrow">From the journal</p>
          <h2 className="editorial-serif mt-4 text-4xl text-stone-900 sm:text-5xl">Notes on keeping a moment.</h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-stone-600">
            Ideas, inspiration, and a little of what happens between the frames.
          </p>
          <Link to="/journal" className="text-link mt-6 inline-flex items-center gap-2">
            Read the journal <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <WatermarkedPhoto
          src={home.hero.primaryImage}
          alt=""
          width="1100"
          height="700"
          loading="lazy"
          className="aspect-[3/2] w-full object-contain"
        />
      </section>

      <section className="relative overflow-hidden bg-[#292720] px-6 py-16 text-white sm:px-10 sm:py-20">
        <div className="absolute -right-12 -top-20 h-72 w-72 rounded-full border border-white/10" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/60">Your story, your way</p>
            <h2 className="editorial-serif mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">Let’s make something worth returning to.</h2>
          </div>
          <Link to="/booking" className="inline-flex min-h-12 items-center gap-2 bg-white px-6 text-sm font-semibold text-stone-950 transition hover:bg-stone-100">
            Start a conversation <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
