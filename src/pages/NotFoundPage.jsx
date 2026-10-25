import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-500">404</p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-900">This page could not be found.</h1>
      <p className="mt-3 max-w-md text-slate-600">
        The page you are looking for may have moved or no longer exists.
      </p>
      <Link to="/" className="mt-8 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700">
        Return home
      </Link>
    </div>
  )
}
