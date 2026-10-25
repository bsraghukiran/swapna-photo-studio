import { Mail } from 'lucide-react'
import site from '../../data/site.json'

export default function StudioContactDetails() {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">Contact details</h3>
      {site.contactEmail ? (
        <ul className="mt-6 space-y-5 text-sm text-slate-600">
          <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-stone-500" /><a href={`mailto:${site.contactEmail}`} className="hover:text-slate-900">{site.contactEmail}</a></li>
        </ul>
      ) : (
        <p className="mt-4 text-sm leading-6 text-slate-600">Add verified studio contact details to src/data/site.json before launch.</p>
      )}
    </div>
  )
}
