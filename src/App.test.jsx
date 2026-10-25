import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    window.localStorage.clear()
    delete document.documentElement.dataset.theme
    document.documentElement.style.colorScheme = ''
  })

  it('renders the hero heading for the studio homepage', async () => {
    render(<App />)

    expect(await screen.findByRole('heading', {
        name: /timeless photography for life/i,
      })).toBeInTheDocument()

    const heroPhoto = screen.getByRole('img', {
      name: /couple relaxing together on a wooden pier/i,
    })
    expect(heroPhoto).toHaveAttribute('src', '/gallery/pre-wedding/024.webp')
    expect(heroPhoto.parentElement).toHaveClass('absolute', 'inset-0')
    expect(heroPhoto.parentElement).not.toHaveClass('z-0')
    expect(heroPhoto).not.toHaveClass('-z-20')
    expect(heroPhoto.parentElement.querySelector('[data-photo-watermark]')).toHaveClass('z-30')
    expect(screen.getByRole('img', { name: 'Wedding photography, image 1' })).toHaveClass('h-auto', 'w-full')

    const directions = screen.getByRole('link', { name: 'Get directions to Swapna Photo Studio' })
    expect(directions).toHaveAttribute('href', expect.stringContaining('geocode=KTno-dQbecc7MeHIxSXiuuxt'))
    expect(directions).toHaveTextContent('Plot No 21/E, Sector 4, Nava Nagar, Bagalkot, Karnataka 587103')
  })

  it('toggles between light and dark themes and remembers the selection', async () => {
    const user = userEvent.setup()
    render(<App />)

    const darkThemeButton = await screen.findByRole('button', { name: 'Switch to dark theme' })
    await user.click(darkThemeButton)

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(window.localStorage.getItem('swapna-theme')).toBe('dark')
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument()
  })

  it('restores the previously selected theme', async () => {
    window.localStorage.setItem('swapna-theme', 'dark')
    render(<App />)

    expect(await screen.findByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument()
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })
})
