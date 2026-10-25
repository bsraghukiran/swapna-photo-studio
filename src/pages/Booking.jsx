import BookingForm from '../components/BookingForm'
import SEOHead from '../components/seo/SEOHead'
import PageHero from '../components/common/PageHero'

export default function Booking() {
  return (
    <>
      <SEOHead title="Enquire about a photography session" description="Share details about a wedding, portrait, family, event, or brand photography enquiry." pathname="/booking" />
      <PageHero eyebrow="Enquiries" title="Let’s talk about the story you want to tell." description="Share your preferred service, date, and vision. Confirm availability and scope directly with the studio before booking." />

      <div className="grid gap-8 py-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="border-t border-stone-300 py-6">
          <p className="eyebrow">Before you enquire</p>
          <h2 className="editorial-serif mt-4 text-4xl text-stone-900">A few details make a good starting point.</h2>
          <p className="mt-4 text-sm leading-7 text-stone-600">Share what you’re planning, where and when it might happen, and any ideas or questions you have. Scope and pricing should be confirmed directly with the studio.</p>
          <p className="mt-6 border-l-2 border-amber-700 pl-4 text-xs leading-5 text-stone-500">
            No booking provider is connected by default. The form explains whether it is sending to a configured endpoint or saving only in this browser.
          </p>
        </div>

        <BookingForm />
      </div>
    </>
  )
}
