import { readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { loadEnv } from 'vite'

const root = process.cwd()
const outputDirectory = path.join(root, 'dist')
const environment = loadEnv('production', root, 'VITE_')
const configuredUrl = process.env.VITE_SITE_URL || environment.VITE_SITE_URL
const site = JSON.parse(await readFile(path.join(root, 'src', 'data', 'site.json'), 'utf8'))

await rm(path.join(outputDirectory, 'sitemap.xml'), { force: true })

if (!configuredUrl) {
  console.warn('VITE_SITE_URL is not set; skipping sitemap generation. Set it before deployment.')
  await writeFile(path.join(outputDirectory, 'robots.txt'), 'User-agent: *\nAllow: /\n')
} else {
  let siteOrigin
  try {
    const parsedUrl = new URL(configuredUrl)
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) throw new Error('Use an HTTP or HTTPS URL.')
    if (parsedUrl.pathname !== '/' || parsedUrl.search || parsedUrl.hash) {
      throw new Error('Set VITE_SITE_URL to the production origin only, without a path, query, or fragment.')
    }
    siteOrigin = parsedUrl.origin
  } catch (error) {
    throw new Error(`Invalid VITE_SITE_URL: ${error.message}`)
  }

  const journal = JSON.parse(await readFile(path.join(root, 'src', 'data', 'journal.json'), 'utf8'))
  const pages = [
    ['Home', '/'],
    ['About', '/about'],
    ['Services', '/services'],
    ['Portfolio', '/portfolio'],
    ['Pricing', '/pricing'],
    ['Booking', '/booking'],
    ['Contact', '/contact'],
    ['Journal', '/journal'],
  ]
  const paths = [
    ...pages.map(([, route]) => route),
    ...journal.articles.map((article) => `/journal/${article.slug}`),
  ]
  const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...paths.map((route) => `  <url><loc>${escapeXml(`${siteOrigin}${route}`)}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n')

  await writeFile(path.join(outputDirectory, 'sitemap.xml'), sitemap)
  await writeFile(
    path.join(outputDirectory, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`,
  )
  console.info(`Generated sitemap.xml for ${siteOrigin} with ${paths.length} URLs.`)
}

const pages = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Portfolio', '/portfolio'],
  ['Pricing', '/pricing'],
  ['Booking', '/booking'],
  ['Contact', '/contact'],
  ['Journal', '/journal'],
]
const llms = [
  `# ${site.name}`,
  '',
  `> ${site.description}`,
  '',
  '## Location',
  `- ${site.address.display}`,
  '',
  ...(configuredUrl
    ? ['## Pages', ...pages.map(([title, route]) => `- ${title}: ${new URL(route, configuredUrl).href}`), '']
    : ['Set VITE_SITE_URL to the live website origin to publish page links here.', '']),
].join('\n')
await writeFile(path.join(outputDirectory, 'llms.txt'), llms)
