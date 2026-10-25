import FeatureItem from '../components/common/FeatureItem'
import PageHero from '../components/common/PageHero'
import WatermarkedPhoto from '../components/common/WatermarkedPhoto'
import SEOHead from '../components/seo/SEOHead'
import { Link } from 'react-router-dom'
import about from '../data/about.json'

export default function About() {
  return (
    <>
      <SEOHead title={about.meta.title} description={about.meta.description} pathname="/about" />
      <PageHero eyebrow="About" title={about.story.title} description="A relaxed, story-led approach to photography rooted in trust, warmth, and visual elegance." />

      <section className="grid gap-10 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6 text-lg leading-8 text-slate-600">
          {about.story.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="overflow-hidden bg-stone-200">
          <WatermarkedPhoto src={about.profile.image} alt="Swapna Photo Studio photographer holding a camera" className="h-auto w-full" width="900" height="1200" loading="lazy" />
          <p className="bg-[#efede6] px-4 py-3 text-xs text-stone-600">The photographer behind Swapna Photo Studio.</p>
        </div>
      </section>

      <section className="py-14">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">{about.profile.name}</h2>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-stone-500">{about.profile.role}</p>
            <p className="mt-5 text-base leading-8 text-slate-600">{about.profile.bio}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {about.values.map((value) => (
              <FeatureItem key={value.title} title={value.title} description={value.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12">
        <p className="mb-5 text-xs leading-5 text-stone-500">A selection of photographs from the studio’s uploaded event and portrait collections.</p>
        <div className="columns-1 gap-6 md:columns-3">
          {about.gallery.map((image, index) => (
            <WatermarkedPhoto key={image} src={image} alt={`Studio gallery image ${index + 1}`} containerClassName="mb-6 inline-block w-full break-inside-avoid overflow-hidden rounded-[24px] shadow-sm" className="h-auto w-full" loading="lazy" />
          ))}
        </div>
      </section>

      <section className="border-t border-stone-300 py-12">
        <h2 className="editorial-serif text-4xl text-stone-900">Let’s make something personal.</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600">Tell us what you would like to remember and we’ll help you explore the right session.</p>
        <Link to="/booking" className="text-link mt-5 inline-flex">Start an enquiry</Link>
      </section>
    </>
  )
}
