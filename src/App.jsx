import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import SiteLayout from './components/layout/SiteLayout'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Booking = lazy(() => import('./pages/Booking'))
const Contact = lazy(() => import('./pages/Contact'))
const Journal = lazy(() => import('./pages/Journal'))
const JournalArticle = lazy(() => import('./pages/JournalArticle'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Services = lazy(() => import('./pages/Services'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div role="status" className="min-h-[50vh] py-20 text-center text-sm text-stone-600">Loading page…</div>}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="booking" element={<Booking />} />
            <Route path="contact" element={<Contact />} />
            <Route path="journal" element={<Journal />} />
            <Route path="journal/:slug" element={<JournalArticle />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="top-right" richColors closeButton />
    </BrowserRouter>
  )
}
