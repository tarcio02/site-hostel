/*
 * Roda depois do `vite build` (ver "build" no package.json).
 * Para cada página de src/seo.ts, gera um HTML já com o conteúdo e as meta tags
 * dela, para o Google e as prévias de link (WhatsApp, Instagram, Facebook), que
 * não executam JavaScript. Também grava sitemap.xml e robots.txt.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const server = join(root, 'dist-server')

const { headFor, pages, render, robotsTxt, sitemapXml } = await import(
  new URL(`file:///${join(server, 'entry-server.js').replace(/\\/g, '/')}`).href
)

const template = await readFile(join(dist, 'index.html'), 'utf8')
const seoBlock = /<!--seo:start-->[\s\S]*?<!--seo:end-->/
if (!seoBlock.test(template) || !template.includes('<div id="root"></div>')) {
  throw new Error('index.html precisa do bloco <!--seo:start-->…<!--seo:end--> e de <div id="root"></div>')
}

for (const page of pages) {
  const html = template
    .replace(seoBlock, headFor(page.path))
    .replace('<div id="root"></div>', `<div id="root">${await render(page.path)}</div>`)
  const file = join(dist, page.file)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
  console.log(`  pré-renderizado ${page.path} → dist/${page.file}`)
}

await writeFile(join(dist, 'sitemap.xml'), sitemapXml())
await writeFile(join(dist, 'robots.txt'), robotsTxt())
await rm(server, { recursive: true, force: true })
console.log('  sitemap.xml e robots.txt gerados')
