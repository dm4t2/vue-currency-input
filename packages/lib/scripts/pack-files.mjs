import { copyFileSync, existsSync, readFileSync, unlinkSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const action = process.argv[2]
const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const files = ['LICENSE', 'README.md'].map((fileName) => ({
  source: resolve(packageRoot, '..', '..', fileName),
  target: resolve(packageRoot, fileName)
}))

if (action === 'copy') {
  files.forEach(({ source, target }) => copyFileSync(source, target))
} else if (action === 'clean') {
  files
    .filter(({ source, target }) => existsSync(target) && readFileSync(target, 'utf8') === readFileSync(source, 'utf8'))
    .forEach(({ target }) => unlinkSync(target))
} else {
  throw new Error(`Unknown pack files action: ${action}`)
}


