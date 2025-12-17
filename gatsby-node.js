const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// Create API endpoint to serve markdown content in development
exports.onCreateDevServer = ({ app }) => {
  const fs = require("fs")
  const path = require("path")

  app.get("/api/article-content/:slug", (req, res) => {
    try {
      const slug = req.params.slug
      const blogRoot = path.join(process.cwd(), "content", "blog")
      const articlePath = path.join(blogRoot, slug, "index.md")

      if (fs.existsSync(articlePath)) {
        const content = fs.readFileSync(articlePath, "utf8")
        res.json({ content })
      } else {
        res.status(404).json({ error: "Article not found" })
      }
    } catch (error) {
      console.error("Error reading article:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  })
}
