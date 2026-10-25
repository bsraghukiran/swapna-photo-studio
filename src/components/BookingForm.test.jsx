import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookingForm from './BookingForm'

describe('BookingForm', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('validates required enquiry fields and makes the local-only behavior clear', async () => {
    const user = userEvent.setup()
    render(<BookingForm />)

    expect(screen.getByText(/prepares an email draft for you to send/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Preferred date')).toHaveAttribute('type', 'date')
    await user.click(screen.getByRole('button', { name: 'Email your enquiry' }))

    expect(await screen.findByText('Please enter your full name.')).toBeInTheDocument()
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument()
    expect(screen.getByText('Please select a preferred date.')).toBeInTheDocument()
    expect(screen.getByText('Please provide a location.')).toBeInTheDocument()
  })

  it('rejects a preferred date in the past', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    render(<BookingForm />)

    await user.type(screen.getByLabelText('Full name'), 'Test Client')
    await user.type(screen.getByLabelText('Email address'), 'client@example.com')
    fireEvent.change(screen.getByLabelText('Preferred date'), { target: { value: '2000-01-01' } })
    await user.type(screen.getByLabelText('Location'), 'Bagalkot')
    fireEvent.submit(screen.getByRole('button', { name: 'Email your enquiry' }).closest('form'))

    expect(await screen.findByText('Please select today or a future date.')).toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('sends valid enquiry data to the configured endpoint and resets on success', async () => {
    const user = userEvent.setup()
    vi.stubEnv('VITE_BOOKING_ENDPOINT', 'https://booking.test/enquiries')
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)
    render(<BookingForm />)

    await user.type(screen.getByLabelText('Full name'), 'Test Client')
    await user.type(screen.getByLabelText('Email address'), 'client@example.com')
    fireEvent.change(screen.getByLabelText('Preferred date'), { target: { value: '2099-01-01' } })
    await user.type(screen.getByLabelText('Location'), 'Bagalkot')
    await user.click(screen.getByRole('button', { name: 'Send session enquiry' }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))
    expect(fetchMock).toHaveBeenCalledWith('https://booking.test/enquiries', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: expect.stringContaining('"name":"Test Client"'),
      signal: expect.anything(),
    }))
    await waitFor(() => expect(screen.getByLabelText('Full name')).toHaveValue(''))
  })

  it('opens an email draft for a valid enquiry when no endpoint is configured', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.fn()
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})
    vi.stubGlobal('fetch', fetchMock)
    render(<BookingForm />)

    await user.type(screen.getByLabelText('Full name'), 'Test Client')
    await user.type(screen.getByLabelText('Email address'), 'client@example.com')
    fireEvent.change(screen.getByLabelText('Preferred date'), { target: { value: '2099-01-01' } })
    await user.type(screen.getByLabelText('Location'), 'Bagalkot')
    await user.click(screen.getByRole('button', { name: 'Email your enquiry' }))

    expect(clickSpy).toHaveBeenCalledOnce()
    expect(clickSpy.mock.contexts[0].href).toContain('mailto:info@mindfreesoftwares.com')
    expect(clickSpy.mock.contexts[0].href).toContain('Test%20Client')
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
