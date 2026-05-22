import { copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const distDir = join(process.cwd(), 'dist')
const indexPath = join(distDir, 'index.html')
const notFoundPath = join(distDir, '404.html')

if (!existsSync(indexPath)) {
  throw new Error('dist/index.html not found. Run the Vite build before creating 404.html.')
}

copyFileSync(indexPath, notFoundPath)
