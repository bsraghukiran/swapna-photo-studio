import BookingForm from '../components/BookingForm'

export default function BookingPage({ onAddBooking }) {
  return (
    <div className="grid gap-10 py-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">Book with us</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Let’s plan a session that feels effortless.
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
          Share your vision, preferred date, and story. We will get back with the right creative proposal and next steps.
        </p>
      </div>

      <BookingForm onSubmit={onAddBooking} />
    </div>
  )
}
