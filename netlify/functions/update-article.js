const fs = require("fs")
const path = require("path")

function yamlString(value) {
  return JSON.stringify(String(value))
}

// Simple auth check
const ADMIN_USERNAME = "anniewang"

function checkAuth(event) {
  const authHeader = event.headers.authorization || event.headers.Authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false
  }
  const token = authHeader.replace("Bearer ", "")
  try {
    const decoded = Buffer.from(token, "base64").toString()
    return decoded.startsWith(ADMIN_USERNAME + ":")
  } catch (e) {
    return false
  }
}

exports.handler = async (event, context) => {
  // Check authentication
  if (!checkAuth(event)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized" }),
    }
  }

  try {
    const body = JSON.parse(event.body)
    const { title, description, date, thumbnail, content, oldSlug } = body

    if (!title || !content || !oldSlug) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Title, content, and oldSlug are required",
        }),
      }
    }

    const blogRoot = path.resolve(process.cwd(), "content", "blog")
    const oldPath = path.join(blogRoot, oldSlug.replace(/^\//, ""))
    const indexPath = path.join(oldPath, "index.md")

    if (!fs.existsSync(indexPath)) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Article not found" }),
      }
    }

    // Build frontmatter
    const frontmatterLines = [
      "---",
      `title: ${yamlString(title)}`,
      `date: ${yamlString(date || new Date().toISOString().slice(0, 10))}`,
    ]

    if (description && description.trim()) {
      frontmatterLines.push(`description: ${yamlString(description.trim())}`)
    }

    if (thumbnail && thumbnail.trim()) {
      frontmatterLines.push(`thumbnail: ${yamlString(thumbnail.trim())}`)
    }

    frontmatterLines.push("---", "")

    // Write file
    const fileContent = [...frontmatterLines, content].join("\n")
    fs.writeFileSync(indexPath, fileContent, "utf8")

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Article updated successfully",
        slug: oldSlug,
      }),
    }
  } catch (error) {
    console.error("Error updating article:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    }
  }
}
