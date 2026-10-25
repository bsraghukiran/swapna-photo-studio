import { defineConfig, loadEnv } from 'vite'
import { copyFile, cp, mkdir, readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function copySelectedPublicAssets() {
  return {
    name: 'copy-selected-public-assets',
    async closeBundle() {
      const publicDirectory = path.join(process.cwd(), 'public')
      const outputDirectory = path.join(process.cwd(), 'dist')
      const rootEntries = await readdir(publicDirectory, { withFileTypes: true })

      for (const entry of rootEntries.filter((item) => item.isFile())) {
        await copyFile(
          path.join(publicDirectory, entry.name),
          path.join(outputDirectory, entry.name),
        )
      }

      const imagesDirectory = path.join(publicDirectory, 'images')
      const imageEntries = await readdir(imagesDirectory, { withFileTypes: true })
      const outputImagesDirectory = path.join(outputDirectory, 'images')
      await mkdir(outputImagesDirectory, { recursive: true })
      for (const entry of imageEntries.filter((item) => item.isFile())) {
        await copyFile(
          path.join(imagesDirectory, entry.name),
          path.join(outputImagesDirectory, entry.name),
        )
      }

      await cp(
        path.join(publicDirectory, 'gallery'),
        path.join(outputDirectory, 'gallery'),
        { recursive: true },
      )

      const videos = JSON.parse(await readFile(path.join(process.cwd(), 'src', 'data', 'videos.json'), 'utf8'))
      for (const video of videos) {
        const source = path.join(imagesDirectory, video.file)
        const destination = path.join(outputImagesDirectory, video.file)
        await mkdir(path.dirname(destination), { recursive: true })
        await copyFile(source, destination)
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, process.cwd(), 'VITE_')
  const siteUrl = (process.env.VITE_SITE_URL || environment.VITE_SITE_URL || '').replace(/\/$/, '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      copySelectedPublicAssets(),
      {
        name: 'static-seo-defaults',
        transformIndexHtml(html) {
          if (!siteUrl) return html
          return html
            .replace('<meta name="robots" content="noindex,follow" />', '<meta name="robots" content="index,follow" />')
            .replace(
              '</head>',
              `  <link rel="canonical" href="${siteUrl}/" />\n    <meta property="og:url" content="${siteUrl}/" />\n  </head>`,
            )
        },
      },
    ],
    build: {
      copyPublicDir: false,
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/setup.js',
      css: true,
    },
  }
})
