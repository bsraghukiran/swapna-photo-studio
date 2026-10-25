import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/common/PageHero'
import SEOHead from '../components/seo/SEOHead'
import site from '../data/site.json'

export default function Contact() {
  return (
    <>
      <SEOHead
        title="Contact the studio"
        description="Start a conversation about wedding, portrait, event, or brand photography."
        pathname="/contact"
      />
      <PageHero
        eyebrow="Contact"
        title="Every good story begins with a conversation."
        description="Share a few details about the moment you have in mind. We’ll help you find the right next step."
      />

      <section className="grid gap-12 py-8 pb-20 lg:grid-cols-[1fr_0.75fr]">
        <div className="border-t border-stone-300 pt-6">
          <p className="eyebrow">Tell us what you're planning</p>
          <h2 className="editorial-serif mt-4 max-w-xl text-4xl leading-tight text-stone-900 sm:text-5xl">
            A celebration, a season, a new idea.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-stone-600">
            We photograph weddings, pre-wedding sessions, portraits, maternity and newborn stories, celebrations, products, and fashion. Every enquiry is an opportunity to understand the people and feeling behind the photographs.
          </p>
          <Link to="/booking" className="mt-7 inline-flex min-h-12 items-center gap-2 bg-stone-900 px-6 text-sm font-semibold text-white transition hover:bg-stone-700">
            Start an enquiry <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <aside className="self-start border border-stone-300 bg-[#efede6] p-6 sm:p-8">
          <p className="eyebrow">A few details help</p>
          <ul className="mt-5 space-y-4 text-sm leading-6 text-stone-700">
            <li><span className="mr-2 text-amber-800">01</span> The kind of session or occasion you’re planning</li>
            <li><span className="mr-2 text-amber-800">02</span> Your preferred date and location</li>
            <li><span className="mr-2 text-amber-800">03</span> Any references, ideas, or questions you have</li>
          </ul>
          {site.contactEmail ? (
            <a href={`mailto:${site.contactEmail}`} className="mt-7 inline-flex items-center gap-2 border-t border-stone-300 pt-5 text-sm font-medium text-stone-900">
              <Mail className="h-4 w-4" /> {site.contactEmail}
            </a>
          ) : (
            <p className="mt-7 border-t border-stone-300 pt-5 text-xs leading-5 text-stone-500">
              Direct email contact is not available yet. You can find the studio address below.
            </p>
          )}
          <div className="mt-5 border-t border-stone-300 pt-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Visit the studio</h2>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-start gap-3 text-sm leading-6 text-stone-700 transition hover:text-stone-950"
            >
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-amber-800" aria-hidden="true" />
              <span>{site.address.display}<span className="mt-1 block text-xs underline underline-offset-4">Open in Google Maps</span></span>
            </a>
          </div>
        </aside>
      </section>
    </>
  )
}
