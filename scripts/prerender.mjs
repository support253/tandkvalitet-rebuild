// Bakes the rendered page into dist/index.html after the client + SSR builds.
// Run via `npm run build`. Fails loudly if the root placeholder is missing.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const indexPath = resolve(root, 'dist/index.html')
const ssrEntry = resolve(root, 'dist-ssr/entry-server.js')

const { render } = await import(pathToFileURL(ssrEntry).href)
const html = render()
const template = readFileSync(indexPath, 'utf8')
const placeholder = '<div id="root"></div>'
if (!template.includes(placeholder)) {
  throw new Error('prerender: <div id="root"></div> not found in dist/index.html')
}
writeFileSync(indexPath, template.replace(placeholder, `<div id="root">${html}</div>`))
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`prerender: wrote ${html.length} chars of HTML into dist/index.html`)
