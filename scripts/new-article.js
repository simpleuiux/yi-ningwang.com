#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require("fs")
const path = require("path")

function slugify(input) {
  return String(input || "")
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function yamlString(value) {
  // YAML double-quoted string, using JSON escaping rules (compatible here).
  return JSON.stringify(String(value))
}

function parseArgs(argv) {
  const args = argv.slice(2)
  const out = { title: "", description: "", slug: "", date: "" }

  // First non-flag token(s) => title
  const titleParts = []
  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if (a.startsWith("--")) break
    titleParts.push(a)
  }
  out.title = titleParts.join(" ").trim()

  // Flags
  for (let i = titleParts.length; i < args.length; i++) {
    const a = args[i]
    if (a === "--description" || a === "-d") {
      out.description = String(args[i + 1] || "")
      i++
      continue
    }
    if (a === "--slug" || a === "-s") {
      out.slug = String(args[i + 1] || "")
      i++
      continue
    }
    if (a === "--date") {
      out.date = String(args[i + 1] || "")
      i++
      continue
    }
  }

  return out
}

function usage() {
  console.log(
    [
      "Create a new article in content/blog/<slug>/index.md",
      "",
      "Usage:",
      '  npm run new:article -- "My Article Title"',
      '  npm run new:article -- "My Article Title" --description "Short summary"',
      '  npm run new:article -- "My Article Title" --slug "custom-slug" --date "2025-12-16"',
      "",
    ].join("\n")
  )
}

function main() {
  const { title, description, slug: slugArg, date: dateArg } = parseArgs(
    process.argv
  )

  if (!title) {
    usage()
    process.exit(1)
  }

  const date = dateArg || new Date().toISOString().slice(0, 10)
  const slug = slugify(slugArg || title)

  if (!slug) {
    console.error("Could not derive a valid slug from the title.")
    process.exit(1)
  }

  const blogRoot = path.resolve(__dirname, "..", "content", "blog")
  const postDir = path.join(blogRoot, slug)
  const indexPath = path.join(postDir, "index.md")

  if (fs.existsSync(postDir)) {
    console.error(`Post folder already exists: ${postDir}`)
    process.exit(1)
  }

  fs.mkdirSync(postDir, { recursive: true })

  const frontmatterLines = [
    "---",
    `title: ${yamlString(title)}`,
    `date: ${yamlString(date)}`,
  ]
  if (description && description.trim()) {
    frontmatterLines.push(`description: ${yamlString(description.trim())}`)
  }
  frontmatterLines.push("---", "")

  const body = [
    ...frontmatterLines,
    "Write your article here.",
    "",
    "Tip: put images in this same folder and reference them like:",
    "![alt text](./my-image.png)",
    "",
  ].join("\n")

  fs.writeFileSync(indexPath, body, "utf8")

  console.log(`Created: ${path.relative(process.cwd(), indexPath)}`)
}

main()
