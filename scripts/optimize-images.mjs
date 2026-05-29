import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { basename, extname, join, resolve } from 'node:path'
import sharp from 'sharp'

const inputDir = resolve(process.cwd(), 'public', 'screenshots')
const outputDir = resolve(process.cwd(), 'public', 'screenshots', 'optimized')

if (!existsSync(inputDir)) {
  console.log('No public/screenshots directory found, skipping image optimization.')
  process.exit(0)
}

mkdirSync(outputDir, { recursive: true })

const supported = new Set(['.png', '.jpg', '.jpeg', '.webp'])
const files = readdirSync(inputDir)
  .filter((name) => supported.has(extname(name).toLowerCase()))
  .map((name) => join(inputDir, name))

const targets = [
  { width: 1280, suffix: '-1280' },
  { width: 1920, suffix: '-1920' },
]

async function optimizeFile(filePath) {
  const sourceName = basename(filePath)
  const sourceBase = basename(sourceName, extname(sourceName))
  const sourceMtime = statSync(filePath).mtimeMs

  for (const target of targets) {
    const webpOut = join(outputDir, `${sourceBase}${target.suffix}.webp`)
    const avifOut = join(outputDir, `${sourceBase}${target.suffix}.avif`)

    const shouldBuildWebp = !existsSync(webpOut) || statSync(webpOut).mtimeMs < sourceMtime
    const shouldBuildAvif = !existsSync(avifOut) || statSync(avifOut).mtimeMs < sourceMtime

    if (shouldBuildWebp) {
      await sharp(filePath)
        .rotate()
        .resize({ width: target.width, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(webpOut)
    }

    if (shouldBuildAvif) {
      await sharp(filePath)
        .rotate()
        .resize({ width: target.width, withoutEnlargement: true })
        .avif({ quality: 52, effort: 4 })
        .toFile(avifOut)
    }
  }
}

async function run() {
  for (const filePath of files) {
    await optimizeFile(filePath)
  }
  console.log(`Optimized ${files.length} screenshot source images into AVIF/WebP responsive assets.`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
