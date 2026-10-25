import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/common/PageHero'
import WatermarkedPhoto from '../components/common/WatermarkedPhoto'
import SEOHead from '../components/seo/SEOHead'
import services from '../data/services.json'

const questions = [
  {
    question: 'How do I choose the right service?',
    answer: 'Start with the occasion and what you hope to remember or communicate. Use the enquiry form to share your ideas and ask questions.',
  },
  {
    question: 'How are pricing and deliverables decided?',
    answer: 'They depend on the session scope, location, timing, and intended use. Confirm the details in a written proposal before booking.',
  },
  {
    question: 'Can a session be tailored to a specific idea?',
    answer: 'Yes. Share your references and practical requirements so the photographer can confirm a suitable approach and scope.',
  },
]

export default function Services() {
  return (
    <>
      <SEOHead title={services.meta.title} description={services.meta.description} pathname="/services" />
      <PageHero
        eyebrow="Services"
        title="Photography shaped around people, place, and purpose."
        description="From a wedding day to a product launch, each commission begins with a conversation about what matters to you."
      />

      <nav aria-label="Photography services" className="border-y border-stone-300 py-5">
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {services.services.map((service) => (
            <li key={service.slug}>
              <a href={`#${service.slug}`} className="text-sm text-stone-600 underline-offset-4 hover:text-stone-950 hover:underline">
                {service.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="py-6">
        <p className="max-w-3xl text-sm leading-7 text-stone-600">
          The service descriptions below are starting points. Coverage, scheduling, usage, deliverables, and pricing should be confirmed in a tailored written proposal before a booking is made.
        </p>
      </section>

      <div className="pb-20">
        {services.services.map((service, index) => (
          <section
            id={service.slug}
            key={service.slug}
            className={`grid scroll-mt-28 gap-8 border-t border-stone-300 py-10 sm:py-14 lg:grid-cols-2 lg:items-center ${index % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''}`}
          >
            <WatermarkedPhoto
              src={service.image}
              alt={`Representative ${service.name.toLowerCase()} photograph`}
              width="900"
              height="700"
              loading="lazy"
              className="h-auto w-full"
            />
            <div>
              <p className="eyebrow">0{index + 1} / Photography service</p>
              <h2 className="editorial-serif mt-4 text-4xl text-stone-900 sm:text-5xl">{service.name}</h2>
              <p className="mt-4 text-base leading-7 text-stone-600">{service.description}</p>
              <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-stone-800">What we can plan together</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{service.planning}</p>
              <p className="mt-4 text-xs leading-5 text-stone-500">
                Specific coverage and final deliverables are confirmed in your proposal.
              </p>
              <Link to="/booking" className="text-link mt-6 inline-flex items-center gap-2">
                Ask about {service.name.toLowerCase()} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        ))}
      </div>

      <section className="border-t border-stone-300 py-16">
        <p className="eyebrow">Good to know</p>
        <h2 className="editorial-serif mt-3 text-4xl text-stone-900">A few common questions.</h2>
        <div className="mt-8 max-w-3xl">
          {questions.map((item) => (
            <details key={item.question} className="group border-t border-stone-300 py-5">
              <summary className="cursor-pointer list-none pr-6 text-base font-medium text-stone-900 marker:hidden">
                {item.question}
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
