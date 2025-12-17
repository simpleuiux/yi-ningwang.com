const fs = require("fs")
const path = require("path")

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
    const slug = event.queryStringParameters?.slug
    if (!slug) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Slug parameter is required" }),
      }
    }

    const blogRoot = path.resolve(process.cwd(), "content", "blog")
    const articlePath = path.join(blogRoot, slug, "index.md")

    if (!fs.existsSync(articlePath)) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Article not found" }),
      }
    }

    const content = fs.readFileSync(articlePath, "utf8")
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)

    if (!frontmatterMatch) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid article format" }),
      }
    }

    const frontmatter = {}
    const lines = frontmatterMatch[1].split("\n")
    for (const line of lines) {
      const match = line.match(/^(\w+):\s*(.+)$/)
      if (match) {
        const key = match[1]
        let value = match[2].trim()
        // Remove quotes if present
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1)
        }
        frontmatter[key] = value
      }
    }

    // Extract content after frontmatter
    const bodyContent = content.replace(/^---\n[\s\S]*?\n---\n/, "")

    return {
      statusCode: 200,
      body: JSON.stringify({
        article: {
          slug: `/${slug}`,
          title: frontmatter.title || "",
          date: frontmatter.date || "",
          description: frontmatter.description || "",
          thumbnail: frontmatter.thumbnail || "",
          content: bodyContent,
        },
      }),
    }
  } catch (error) {
    console.error("Error getting article:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    }
  }
}
