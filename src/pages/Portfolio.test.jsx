import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Portfolio from './Portfolio'

describe('Portfolio', () => {
  it('filters by category and opens a keyboard-accessible lightbox', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <MemoryRouter initialEntries={['/portfolio']}>
        <Routes>
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: 'Fashion' }))
    expect(screen.getByRole('heading', { name: 'Fashion 1' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Wedding 1' })).not.toBeInTheDocument()
    expect(container.querySelectorAll('[data-photo-watermark]')).toHaveLength(24)
    expect(container.querySelectorAll('video')).toHaveLength(2)
    const featuredImage = screen.getByRole('img', { name: 'Fashion photography, image 1' })
    expect(featuredImage).toHaveClass('h-auto', 'w-full')
    expect(featuredImage.style.aspectRatio).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Load more photographs' }))
    expect(container.querySelectorAll('[data-photo-watermark]')).toHaveLength(29)

    const imageButton = screen.getByRole('button', { name: 'Open image: Fashion 1' })
    await user.click(imageButton)
    expect(screen.getByRole('dialog', { name: 'Portfolio image: Fashion 1' })).toBeInTheDocument()
    expect(container.querySelectorAll('[data-photo-watermark]')).toHaveLength(30)

    fireEvent.keyDown(window, { key: 'Escape' })
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(imageButton).toHaveFocus()
  })
})
