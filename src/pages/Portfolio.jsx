import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/common/PageHero'
import WatermarkedPhoto from '../components/common/WatermarkedPhoto'
import VideoGallery from '../components/portfolio/VideoGallery'
import SEOHead from '../components/seo/SEOHead'
import portfolio from '../data/portfolio.json'

export default function Portfolio() {
  const [category, setCategory] = useState('All')
  const [activeIndex, setActiveIndex] = useState(null)
  const [itemsToShow, setItemsToShow] = useState(24)
  const closeButton = useRef(null)
  const lastTrigger = useRef(null)
  const visibleItems = category === 'All'
    ? portfolio.items
    : portfolio.items.filter((item) => item.category === category)
  const displayedItems = visibleItems.slice(0, itemsToShow)
  const activeItem = activeIndex === null ? null : visibleItems[activeIndex]
  const isOpen = activeIndex !== null

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowRight') setActiveIndex((index) => (index + 1) % visibleItems.length)
      if (event.key === 'ArrowLeft') setActiveIndex((index) => (index - 1 + visibleItems.length) % visibleItems.length)
      if (event.key === 'Tab') {
        const controls = document.querySelectorAll('[data-lightbox-control]')
        const first = controls[0]
        const last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      lastTrigger.current?.focus()
    }
  }, [isOpen, visibleItems.length])

  return (
    <>
      <SEOHead title={portfolio.meta.title} description={portfolio.meta.description} pathname="/portfolio" />
      <PageHero
        eyebrow="Selected work"
        title="Photographs that hold on to how it felt."
        description="Explore photographs from weddings, pre-wedding sessions, maternity and newborn stories, celebrations, and fashion."
      />

      <section className="pb-20">
        <p className="mb-6 max-w-2xl border-l-2 border-amber-700 pl-4 text-sm leading-6 text-stone-600">
          Browse selected photographs from the studio’s uploaded event and portrait collections.
        </p>
        <div className="mb-8 flex flex-wrap gap-2" aria-label="Filter portfolio by category">
          {['All', ...portfolio.categories].map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={category === option}
              onClick={() => {
                setCategory(option)
                setActiveIndex(null)
                setItemsToShow(24)
              }}
              className={`min-h-10 border px-4 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800 ${
                category === option
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-300 bg-transparent text-stone-700 hover:border-stone-900'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="columns-1 gap-x-5 sm:columns-2 lg:columns-3">
          {displayedItems.map((item, index) => (
            <article key={item.title} className="group mb-8 inline-block w-full break-inside-avoid">
              <button
                type="button"
                onClick={(event) => {
                  lastTrigger.current = event.currentTarget
                  setActiveIndex(index)
                }}
                aria-label={`Open image: ${item.title}`}
                className="block w-full overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-800"
              >
                <WatermarkedPhoto
                  src={item.image}
                  alt={item.alt || ''}
                  loading="lazy"
                  style={{ aspectRatio: item.aspect }}
                  className="h-auto w-full transition duration-700 group-hover:scale-[1.025]"
                />
              </button>
              <div className="flex items-start justify-between gap-4 pt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">{item.category}</p>
                  <h2 className="editorial-serif mt-1 text-2xl text-stone-900">{item.title}</h2>
                </div>
                <p className="max-w-[12rem] pt-1 text-right text-xs leading-5 text-stone-500">{item.caption}</p>
              </div>
            </article>
          ))}
        </div>
        {displayedItems.length < visibleItems.length ? (
          <button
            type="button"
            onClick={() => setItemsToShow((count) => count + 24)}
            className="mt-10 min-h-11 border border-stone-400 px-6 text-sm font-medium text-stone-800 transition hover:border-stone-900 hover:bg-stone-900 hover:text-white"
          >
            Load more photographs
          </button>
        ) : null}
      </section>

      <VideoGallery />

      <section className="border-t border-stone-300 py-12">
        <h2 className="editorial-serif text-3xl text-stone-900">Have a story in mind?</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600">Tell us what you’re celebrating and we’ll help you shape a photography experience around it.</p>
        <Link to="/booking" className="text-link mt-5 inline-flex items-center">Make an enquiry <ArrowRight className="ml-2 h-4 w-4" /></Link>
      </section>

      {activeItem ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Portfolio image: ${activeItem.title}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null)
          }}
        >
          <button
            ref={closeButton}
            type="button"
            data-lightbox-control
            onClick={() => setActiveIndex(null)}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center border border-white/40 text-white hover:bg-white/10"
          >
            <X aria-hidden="true" />
          </button>
          <button
            type="button"
            data-lightbox-control
            onClick={() => setActiveIndex((activeIndex - 1 + visibleItems.length) % visibleItems.length)}
            aria-label="Previous image"
            className="absolute left-3 z-10 grid h-11 w-11 place-items-center border border-white/40 text-white hover:bg-white/10 sm:left-8"
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <figure className="flex max-h-full max-w-5xl flex-col items-center">
            <WatermarkedPhoto src={activeItem.image} alt={activeItem.alt || ''} className="max-h-[78vh] max-w-full object-contain" />
            <figcaption className="mt-4 text-center text-white">
              <span className="editorial-serif text-xl">{activeItem.title}</span>
              <span className="ml-3 text-xs uppercase tracking-[0.18em] text-white/60">{activeItem.category}</span>
            </figcaption>
          </figure>
          <button
            type="button"
            data-lightbox-control
            onClick={() => setActiveIndex((activeIndex + 1) % visibleItems.length)}
            aria-label="Next image"
            className="absolute right-3 z-10 grid h-11 w-11 place-items-center border border-white/40 text-white hover:bg-white/10 sm:right-8"
          >
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </>
  )
}
