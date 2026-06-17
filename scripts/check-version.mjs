import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'))
const jsr = JSON.parse(readFileSync('jsr.json', 'utf-8'))

if (jsr.version === pkg.version) {
  console.log(`Versions in sync at ${pkg.version}`)
  process.exit(0)
}

console.error(
  `Version mismatch: package.json=${pkg.version}, jsr.json=${jsr.version}`,
)
console.error('Run: pnpm sync-version')
process.exit(1)
