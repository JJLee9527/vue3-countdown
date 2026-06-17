import { readFileSync, writeFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'))
const jsrPath = 'jsr.json'
const jsr = JSON.parse(readFileSync(jsrPath, 'utf-8'))

if (jsr.version === pkg.version) {
  console.log(`jsr.json already at ${pkg.version}`)
  process.exit(0)
}

jsr.version = pkg.version
writeFileSync(jsrPath, `${JSON.stringify(jsr, null, 2)}\n`)
console.log(`Synced jsr.json version to ${pkg.version}`)
