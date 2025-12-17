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
    const body = JSON.parse(event.body)
    const { slug } = body

    if (!slug) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Slug is required" }),
      }
    }

    const blogRoot = path.resolve(process.cwd(), "content", "blog")
    const articleDir = path.join(blogRoot, slug.replace(/^\//, ""))

    if (!fs.existsSync(articleDir)) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Article not found" }),
      }
    }

    // Delete directory and all its contents
    fs.rmSync(articleDir, { recursive: true, force: true })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Article deleted successfully" }),
    }
  } catch (error) {
    console.error("Error deleting article:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    }
  }
}
