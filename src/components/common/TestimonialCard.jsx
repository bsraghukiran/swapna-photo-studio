export default function TestimonialCard({ testimonial }) {
  return (
    <blockquote className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-lg leading-8 text-slate-700">“{testimonial.quote}”</p>
      <footer className="mt-6 border-t border-slate-200 pt-4">
        <div className="font-semibold text-slate-900">{testimonial.name}</div>
        <div className="text-sm text-slate-500">{testimonial.context}</div>
      </footer>
    </blockquote>
  )
}
