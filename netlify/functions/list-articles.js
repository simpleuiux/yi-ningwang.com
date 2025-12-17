const fs = require("fs")
const path = require("path")

// Simple auth check - in production, use proper JWT validation
const ADMIN_USERNAME = "anniewang"

function checkAuth(event) {
  const authHeader = event.headers.authorization || event.headers.Authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false
  }
  const token = authHeader.replace("Bearer ", "")
  // Simple check - token should be base64 encoded username:timestamp
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
    // In Netlify Functions, process.cwd() is the repository root
    const blogRoot = path.resolve(process.cwd(), "content", "blog")
    const articles = []

    if (!fs.existsSync(blogRoot)) {
      return {
        statusCode: 200,
        body: JSON.stringify({ articles: [] }),
      }
    }

    const dirs = fs.readdirSync(blogRoot, { withFileTypes: true })

    for (const dir of dirs) {
      if (dir.isDirectory()) {
        const indexPath = path.join(blogRoot, dir.name, "index.md")
        if (fs.existsSync(indexPath)) {
          const content = fs.readFileSync(indexPath, "utf8")
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
          
          if (frontmatterMatch) {
            const frontmatter = {}
            const lines = frontmatterMatch[1].split("\n")
            for (const line of lines) {
              // Match key: value pattern, handling quoted and unquoted values
              const match = line.match(/^(\w+):\s*(.+)$/)
              if (match) {
                const key = match[1]
                let value = match[2].trim()
                // Remove quotes if present (handles both single and double quotes)
                if ((value.startsWith('"') && value.endsWith('"')) || 
                    (value.startsWith("'") && value.endsWith("'"))) {
                  value = value.slice(1, -1)
                }
                frontmatter[key] = value
              }
            }
            
            articles.push({
              slug: `/${dir.name}`,
              title: frontmatter.title || dir.name,
              date: frontmatter.date || "",
              description: frontmatter.description || "",
              thumbnail: frontmatter.thumbnail || "",
            })
          }
        }
      }
    }

    // Sort by date descending
    articles.sort((a, b) => {
      const dateA = new Date(a.date || 0)
      const dateB = new Date(b.date || 0)
      return dateB - dateA
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ articles }),
    }
  } catch (error) {
    console.error("Error listing articles:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    }
  }
}

