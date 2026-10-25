import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import site from '../data/site.json'

const getLocalDateString = (date) => {
  const localDate = new Date(date)
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset())
  return localDate.toISOString().slice(0, 10)
}

const isValidDate = (value) => {
  const date = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

const bookingSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.').max(120, 'Please enter a shorter name.'),
  email: z.string().trim().email('Please enter a valid email address.').max(254, 'Please enter a shorter email address.'),
  phone: z.string().max(40, 'Please enter a shorter phone number.').optional().or(z.literal('')),
  service: z.string().min(2, 'Please choose a service.').max(100, 'Please choose a valid service.'),
  date: z.string()
    .min(1, 'Please select a preferred date.')
    .refine((value) => !value || isValidDate(value), 'Please select a valid date.')
    .refine((value) => !value || value >= getLocalDateString(new Date()), 'Please select today or a future date.'),
  location: z.string().trim().min(2, 'Please provide a location.').max(200, 'Please enter a shorter location.'),
  notes: z.string().max(500).optional().or(z.literal('')),
})

const initialValues = {
  name: '',
  email: '',
  phone: '',
  service: 'Wedding Photography',
  date: '',
  location: '',
  notes: '',
}

export default function BookingForm() {
  const [formError, setFormError] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: initialValues,
  })

  const onFormSubmit = async (values) => {
    setFormError('')
    const endpoint = import.meta.env.VITE_BOOKING_ENDPOINT
    if (!endpoint) {
      const subject = encodeURIComponent(`Photography enquiry: ${values.service}`)
      const body = encodeURIComponent([
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Phone: ${values.phone || 'Not provided'}`,
        `Service: ${values.service}`,
        `Preferred date: ${values.date}`,
        `Location: ${values.location}`,
        `Project details: ${values.notes || 'Not provided'}`,
      ].join('\n'))
      const emailLink = document.createElement('a')
      emailLink.href = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`
      emailLink.click()
      return
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        signal: controller.signal,
      })
      if (!response.ok) throw new Error(`The booking service returned ${response.status}.`)
      toast.success('Your enquiry has been sent.')
      reset()
    } catch (error) {
      if (controller.signal.aborted) {
        setFormError('The booking service took too long to respond. Please try again.')
      } else {
        setFormError(error instanceof Error ? error.message : 'We could not send your enquiry. Please try again.')
      }
    } finally {
      clearTimeout(timeoutId)
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="min-w-0 rounded-[30px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-800">Book a session</p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-900">Tell us about your vision</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {import.meta.env.VITE_BOOKING_ENDPOINT
              ? 'Your enquiry will be sent to the configured booking service.'
              : 'No booking service is connected yet. Submitting a valid enquiry prepares an email draft for you to send.'}
          </p>
          {!import.meta.env.VITE_BOOKING_ENDPOINT && site.contactEmail ? (
            <p className="mt-3 text-sm text-slate-600">
              Prefer email? <a className="font-medium text-slate-900 underline underline-offset-4" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2">
        <label className="block min-w-0">
          <span className="mb-2 block text-sm font-medium text-slate-700">Full name</span>
          <input
            {...register('name')}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-amber-700 focus:bg-white"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'booking-name-error' : undefined}
          />
          {errors.name ? <span id="booking-name-error" className="mt-1 block text-xs text-rose-600">{errors.name.message}</span> : null}
        </label>

        <label className="block min-w-0">
          <span className="mb-2 block text-sm font-medium text-slate-700">Email address</span>
          <input
            {...register('email')}
            type="email"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-amber-700 focus:bg-white"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'booking-email-error' : undefined}
          />
          {errors.email ? <span id="booking-email-error" className="mt-1 block text-xs text-rose-600">{errors.email.message}</span> : null}
        </label>

        <label className="block min-w-0">
          <span className="mb-2 block text-sm font-medium text-slate-700">Phone (optional)</span>
          <input
            {...register('phone')}
            type="tel"
            autoComplete="tel"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-amber-700 focus:bg-white"
            placeholder="Your phone number"
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone ? <span className="mt-1 block text-xs text-rose-600">{errors.phone.message}</span> : null}
        </label>

        <label className="block min-w-0">
          <span className="mb-2 block text-sm font-medium text-slate-700">Service</span>
          <select
            {...register('service')}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-rose-400 focus:bg-white"
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? 'booking-service-error' : undefined}
          >
            <option>Wedding Photography</option>
            <option>Portrait Session</option>
            <option>Maternity & Family</option>
            <option>Newborn Photography</option>
            <option>Product Photography</option>
            <option>Event Coverage</option>
            <option>Cinematic Videography</option>
            <option>Photo Editing & Retouching</option>
          </select>
          {errors.service ? <span id="booking-service-error" className="mt-1 block text-xs text-rose-600">{errors.service.message}</span> : null}
        </label>

        <div className="min-w-0">
          <label htmlFor="booking-date" className="mb-2 block text-sm font-medium text-slate-700">Preferred date</label>
          <input
            {...register('date')}
            id="booking-date"
            type="date"
            min={getLocalDateString(new Date())}
            className="w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-amber-700 focus:bg-white"
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? 'booking-date-error' : undefined}
          />
          {errors.date ? <span id="booking-date-error" className="mt-1 block text-xs text-rose-600">{errors.date.message}</span> : null}
        </div>

        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-medium text-slate-700">Location</span>
          <input
            {...register('location')}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-amber-700 focus:bg-white"
            placeholder="City, region, or venue"
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? 'booking-location-error' : undefined}
          />
          {errors.location ? <span id="booking-location-error" className="mt-1 block text-xs text-rose-600">{errors.location.message}</span> : null}
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-medium text-slate-700">Project details</span>
          <textarea
            {...register('notes')}
            rows={5}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-amber-700 focus:bg-white"
            placeholder="Tell us about your event, style preferences, and any special shots you want."
          />
          {errors.notes ? <span className="mt-1 block text-xs text-rose-600">{errors.notes.message}</span> : null}
        </label>
      </div>

      {formError ? <p role="alert" className="mt-4 text-sm text-rose-700">{formError}</p> : null}
      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-stone-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting
          ? 'Sending enquiry…'
          : import.meta.env.VITE_BOOKING_ENDPOINT
            ? 'Send session enquiry'
            : 'Email your enquiry'}
      </button>
    </form>
  )
}
