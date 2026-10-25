import { readdir, stat, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const publicImages = path.join(root, 'public', 'images')
const galleryDirectory = path.join(root, 'public', 'gallery')
const categoryFolders = [
  { folder: 'Wedding', name: 'Wedding', slug: 'wedding' },
  { folder: 'Pre-Wedding', name: 'Pre-Wedding', slug: 'pre-wedding' },
  { folder: 'Maternity', name: 'Maternity', slug: 'maternity' },
  { folder: 'New-Born', name: 'Newborn', slug: 'newborn' },
  { folder: 'Baby', name: 'Baby', slug: 'baby' },
  { folder: 'Baby Shower', name: 'Baby Shower', slug: 'baby-shower' },
  { folder: 'Mehandi', name: 'Mehandi', slug: 'mehandi' },
  { folder: 'Fashion', name: 'Fashion', slug: 'fashion' },
]
const captions = {
  Wedding: 'A moment from a wedding day, captured as it unfolded.',
  'Pre-Wedding': 'A relaxed portrait from a pre-wedding story.',
  Maternity: 'A quiet moment from a maternity photography session.',
  Newborn: 'A tender newborn portrait, captured gently.',
  Baby: 'A joyful child portrait from the studio collection.',
  'Baby Shower': 'A family celebration, photographed with warmth and care.',
  Mehandi: 'Color and celebration from a Mehandi story.',
  Fashion: 'An expressive portrait from a fashion photography session.',
}
const itemsByCategory = []

async function findPhotos(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...await findPhotos(fullPath))
    } else if (/\.(jpe?g)$/i.test(entry.name)) {
      files.push(fullPath)
    }
  }

  return files
}

for (const category of categoryFolders) {
  const sourceDirectory = path.join(publicImages, category.folder)
  const sources = await findPhotos(sourceDirectory)
  if (!sources.length) throw new Error(`No JPEG photos found in ${sourceDirectory}`)

  const outputDirectory = path.join(galleryDirectory, category.slug)
  await mkdir(outputDirectory, { recursive: true })
  const items = []

  for (const [index, source] of sources.entries()) {
    const filename = `${String(index + 1).padStart(3, '0')}.webp`
    const output = path.join(outputDirectory, filename)
    const [sourceInfo, outputInfo] = await Promise.all([
      stat(source),
      stat(output).catch(() => null),
    ])

    if (!outputInfo || sourceInfo.mtimeMs > outputInfo.mtimeMs) {
      await sharp(source)
        .rotate()
        .resize({ width: 1800, height: 1400, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80, effort: 4 })
        .toFile(output)
    }

    const imageInfo = await sharp(output).metadata()
    items.push({
      title: `${category.name} ${index + 1}`,
      category: category.name,
      caption: captions[category.name],
      image: `/gallery/${category.slug}/${filename}`,
      alt: `${category.name} photography, image ${index + 1}`,
      aspect: Number((imageInfo.width / imageInfo.height).toFixed(3)),
    })
  }

  itemsByCategory.push(items)
  console.info(`Prepared ${sources.length} ${category.name} photos.`)
}

const maxCategoryLength = Math.max(...itemsByCategory.map((items) => items.length))
const items = []
for (let index = 0; index < maxCategoryLength; index += 1) {
  for (const categoryItems of itemsByCategory) {
    if (categoryItems[index]) items.push(categoryItems[index])
  }
}

const portfolio = {
  meta: {
    title: 'Photography Portfolio',
    description: 'Explore wedding, pre-wedding, maternity, newborn, family, celebration, and fashion photography from Swapna Photo Studio.',
  },
  categories: categoryFolders.map((category) => category.name),
  items,
}

await writeFile(
  path.join(root, 'src', 'data', 'portfolio.json'),
  `${JSON.stringify(portfolio, null, 2)}\n`,
)
console.info(`Generated portfolio data for ${items.length} uploaded photos.`)
