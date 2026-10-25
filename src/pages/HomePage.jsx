import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import PortfolioCard from '../components/PortfolioCard'
import { portfolioItems, services, studioStats, testimonials } from '../data/siteData'

export default function HomePage() {
  return (
    <>
      <section className="pb-18 relative overflow-hidden py-10 sm:py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(251,191,36,0.28),transparent_28%),radial-gradient(circle_at_left,_rgba(244,114,182,0.18),transparent_45%)]" />
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">
              Modern photography studio
            </p>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Tell your story in light, emotion, and motion.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              We craft emotionally rich, artistically refined photography experiences for weddings,
              portraits, brands, and once-in-a-lifetime milestones.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Book a session
              </Link>
              <Link
                to="/gallery"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
              >
                View gallery
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {studioStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
                  <div className="text-2xl font-semibold tracking-tight text-slate-900">{stat.value}</div>
                  <div className="mt-1 text-xs text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-rose-200 blur-3xl" />
            <div className="absolute -bottom-8 right-0 h-32 w-32 rounded-full bg-amber-200 blur-3xl" />
            <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-3 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
              <img
                src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80"
                alt="Couple posing during a wedding shoot"
                className="h-[560px] w-full rounded-[24px] object-cover"
              />
              <div className="absolute bottom-10 left-10 rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Featured</div>
                <div className="mt-2 text-xl font-semibold text-slate-900">Wedding stories</div>
                <div className="text-sm text-slate-600">Cinematic, natural, unforgettable.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <SectionHeading
          eyebrow="Our expertise"
          title="Complete photography services for every meaningful chapter."
          description="From intimate weddings to commercial campaigns, our creative direction blends editorial style with genuine storytelling."
          align="center"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.slice(0, 4).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Portfolio"
            title="Recent work with heart and precision."
            description="Selected frames from weddings, portraits, campaigns, and lifestyle moments."
          />
          <Link to="/gallery" className="hidden text-sm font-semibold text-slate-900 underline-offset-4 hover:underline md:inline-block">
            View all work
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {portfolioItems.slice(0, 6).map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="grid gap-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-3 lg:p-8">
          <div className="lg:col-span-1">
            <SectionHeading
              eyebrow="Why choose us"
              title="A studio experience designed around you."
            />
          </div>

          <div className="grid gap-5 lg:col-span-2 md:grid-cols-3">
            {[
              ['Creative direction', 'Mood boards, styling support, and shot planning for each session.'],
              ['Luxury finish', 'Beautiful retouching, refined color grading, and gallery curation.'],
              ['Fast delivery', 'Timely previews, shareable galleries, and polished final edits.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl bg-slate-50 p-5">
                <div className="mb-4 h-10 w-10 rounded-full bg-gradient-to-br from-amber-200 via-rose-200 to-fuchsia-200" />
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <SectionHeading
          eyebrow="Client love"
          title="Trusted by couples, families, creatives, and brands."
          align="center"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.name} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-lg leading-8 text-slate-700">“{testimonial.quote}”</p>
              <footer className="mt-6 border-t border-slate-200 pt-4">
                <div className="font-semibold text-slate-900">{testimonial.name}</div>
                <div className="text-sm text-slate-500">{testimonial.label}</div>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="rounded-[32px] bg-slate-900 px-6 py-12 text-center text-white shadow-xl sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Ready to begin?</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Let’s create imagery that feels like you.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Book your consultation and let us design a story-led photography experience tailored to your event or brand.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/booking" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
              Schedule your session
            </Link>
            <Link to="/pricing" className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Explore pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
