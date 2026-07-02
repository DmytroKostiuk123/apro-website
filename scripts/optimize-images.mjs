import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

// Covers are shown full-bleed (hero), cases/work as cards — different target sizes
const TARGETS = [
  { dir: 'public/images/covers', maxWidth: 1920, quality: 78 },
  { dir: 'public/images/cases', maxWidth: 1200, quality: 78 },
  { dir: 'public/images/work', maxWidth: 900, quality: 78 },
]

for (const { dir, maxWidth, quality } of TARGETS) {
  const files = (await readdir(dir)).filter((f) => f.toLowerCase().endsWith('.jpg'))
  for (const file of files) {
    const src = path.join(dir, file)
    const out = src.replace(/\.jpg$/i, '.webp')
    const info = await sharp(src)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality })
      .toFile(out)
    console.log(`${src} -> ${out} (${Math.round(info.size / 1024)} KB)`)
  }
}
