import { useMemo, useState } from 'react'
import PortfolioCard from '../components/PortfolioCard'
import SectionHeading from '../components/SectionHeading'
import { portfolioItems } from '../data/siteData'

const filters = ['All', 'Wedding', 'Portrait', 'Family', 'Newborn', 'Product', 'Event', 'Video']

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const visibleItems = useMemo(() => {
    if (activeFilter === 'All') {
      return portfolioItems
    }
    return portfolioItems.filter((item) => item.category === activeFilter)
  }, [activeFilter])

  return (
    <div className="space-y-10 py-8">
      <SectionHeading
        eyebrow="Gallery"
        title="A curated collection of stories we have helped preserve."
        description="Browse through romantic weddings, intimate portraits, joyful families, and high-end brand content."
      />

      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={[
              'rounded-full border px-4 py-2 text-sm font-medium transition',
              activeFilter === filter
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300',
            ].join(' ')}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleItems.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
