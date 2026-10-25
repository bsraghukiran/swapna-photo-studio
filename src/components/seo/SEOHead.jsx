import { useEffect } from 'react'
import site from '../../data/site.json'

export default function SEOHead({ title, description, pathname = '/', image, schema, indexable = true }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.name}` : site.name
    const fullDescription = description || site.description
    const baseUrl = import.meta.env.VITE_SITE_URL || site.url
    const canonicalUrl = baseUrl && indexable
      ? `${baseUrl.replace(/\/$/, '')}${pathname === '/' ? '/' : pathname}`
      : ''
    const shareImage = image || site.defaultOgImage

    document.title = fullTitle

    const setMeta = (name, content, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }
    const removeMeta = (selector) => document.querySelector(selector)?.remove()

    setMeta('description', fullDescription)
    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', fullDescription, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:site_name', site.name, 'property')
    setMeta('og:locale', site.locale, 'property')
    setMeta('robots', canonicalUrl ? 'index,follow' : 'noindex,follow')
    if (canonicalUrl) {
      setMeta('og:url', canonicalUrl, 'property')
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = canonicalUrl
    } else {
      removeMeta('meta[property="og:url"]')
      removeMeta('link[rel="canonical"]')
    }
    setMeta('og:image', shareImage, 'property')
    setMeta('twitter:image', shareImage)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', fullDescription)

    const scriptId = 'studio-schema'
    let existing = document.getElementById(scriptId)
    const organization = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: site.name,
          description: site.description,
          address: {
            '@type': 'PostalAddress',
            streetAddress: site.address.streetAddress,
            addressLocality: site.address.addressLocality,
            addressRegion: site.address.addressRegion,
            postalCode: site.address.postalCode,
            addressCountry: site.address.addressCountry,
          },
          hasMap: site.mapsUrl,
          ...(canonicalUrl ? { url: baseUrl } : {}),
        },
        ...(canonicalUrl
          ? [{
              '@type': 'WebSite',
              name: site.name,
              url: `${baseUrl.replace(/\/$/, '')}/`,
              inLanguage: site.language,
            }]
          : []),
      ],
    }
    const jsonLd = schema || organization

    if (existing) {
      existing.textContent = JSON.stringify(jsonLd)
    } else {
      existing = document.createElement('script')
      existing.id = scriptId
      existing.type = 'application/ld+json'
      existing.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(existing)
    }
  }, [title, description, pathname, image, schema, indexable])

  return null
}
