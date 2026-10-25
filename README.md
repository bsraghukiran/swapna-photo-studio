# Swapna Photo Studio

A responsive photography studio website built with React, Vite, Tailwind CSS, React Router, and Framer Motion. The project retains the existing JSX architecture and uses local JSON modules for editable site content; a full TSX migration was not introduced into this established codebase.

## Run locally

```sh
npm install
npm run dev
npm test
npm run build
npm run preview
```

## Configure before launch

1. Copy `.env.example` to `.env` and set `VITE_SITE_URL` to the real production origin (for example, `https://www.your-studio-domain.com`).
   - With a configured URL, the production build emits the homepage canonical URL, allows indexing, and generates `dist/sitemap.xml` plus a matching `dist/robots.txt`.
   - Without it, the build intentionally leaves the app `noindex,follow` and does not emit a sitemap. Do not deploy publicly until the real domain is configured.
2. The uploaded JPEG collections under `public/images/` are optimized into the public portfolio by `npm run prepare:gallery`. The script creates resized WebP images in `public/gallery/` and refreshes `src/data/portfolio.json`. Production builds copy those optimized photos and only the two clips listed in `src/data/videos.json`, not the multi-gigabyte source archives.
3. Replace sample journal articles and photographer profile details with approved, verified material. Client testimonials are not displayed until approved quotations are supplied. Confirm that all uploaded photos and video clips are authorized for public use before launch.
4. The supplied Bagalkot studio address and Google Maps directions link are configured in `src/data/site.json`. Add a verified email address there before launch; no phone number, hours, awards, or rating are assumed.
5. Confirm all service details, deliverables, and pricing in writing before displaying firm claims.

## Enquiry form integration

Without a configured `VITE_BOOKING_ENDPOINT`, the enquiry form validates input and opens an email draft addressed to the studio contact email; the visitor must send it from their email app. It does not send or store submissions itself. Configure `VITE_BOOKING_ENDPOINT` as a public POST endpoint to send JSON form data to a booking provider or serverless function. The form reports non-2xx responses and network errors. Do not place API secrets in `VITE_` variables or frontend source.

The endpoint should accept a JSON body containing `name`, `email`, `phone`, `service`, `date`, `location`, and `notes`. Add server-side validation, spam protection, consent/privacy wording, and a privacy policy appropriate to the selected provider before collecting real customer information. Test delivery and the studio's notification/response workflow end-to-end; a successful browser response alone does not confirm the enquiry reaches the right person.

## Routing and deployment

This is a client-rendered SPA. Netlify fallback is included in `public/_redirects`; `vercel.json` provides a Vercel rewrite. Configure an equivalent fallback to `/index.html` on other hosts so direct visits to routes such as `/journal/...` resolve.

React updates page metadata after a route renders, but the project does not prerender each route. Search engines that do not execute JavaScript may only see the shared `index.html`; for reliable per-route initial HTML, add a prerender or static-generation step before launch. No SEO score or live-domain audit has been claimed.

## Photo and video gallery

The portfolio reads all JPEGs in the supported event folders under `public/images/`, creates optimized WebP copies, and displays them with category filters and incremental loading. Two selected pre-wedding MP4 clips are included in the portfolio video section with playback controls. Additional source videos are intentionally excluded from production output because the original video archive is several gigabytes; update `src/data/videos.json` to choose different clips, keeping their deployment size in mind.

## SEO MCP and audit notes

No SEO MCP server/tools were available in the connected tool list during implementation. Local metadata, JSON-LD, robots, and sitemap handling are implemented, but keyword/search-intent research, live structured-data validation, broken-link checks, and Core Web Vitals require an external SEO/browser audit after a production URL is supplied.
