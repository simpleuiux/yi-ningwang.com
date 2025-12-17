import React, { useEffect, useState } from "react"
import { navigate, graphql } from "gatsby"
import { useAuth } from "../../contexts/AuthContext"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import ArticleEditor from "../../components/ArticleEditor"

const EditArticlePage = ({ location, data }) => {
  const { isAuthenticated, loading, getAuthToken } = useAuth()
  const [article, setArticle] = useState(null)
  const [fetching, setFetching] = useState(true)

  // Extract slug from query parameter
  const searchParams =
    typeof window !== "undefined" && location
      ? new URLSearchParams(location.search)
      : null
  const slug = searchParams ? searchParams.get("slug") : null

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/admin/login")
    }
  }, [loading, isAuthenticated])

  useEffect(() => {
    if (isAuthenticated && slug) {
      fetchArticle()
    } else if (isAuthenticated && !slug) {
      navigate("/admin")
    }
  }, [isAuthenticated, slug])

  const fetchArticle = async () => {
    // First, try to get from GraphQL data (from page query) and fetch content
    if (data && data.allMarkdownRemark && data.allMarkdownRemark.edges) {
      const foundArticle = data.allMarkdownRemark.edges.find(
        ({ node }) => node.fields.slug.replace(/^\//, "") === slug
      )

      if (foundArticle) {
        const node = foundArticle.node

        // Fetch the markdown content from our API endpoint
        try {
          const response = await fetch(
            `/api/article-content/${encodeURIComponent(slug)}`
          )

          let content = ""
          if (response.ok) {
            const result = await response.json()
            const fullContent = result.content || ""
            // Extract content after frontmatter
            content = fullContent.replace(/^---\n[\s\S]*?\n---\n/, "")
          } else {
            console.warn("Could not fetch article content from API")
          }

          setArticle({
            title: node.frontmatter.title || "",
            date: node.frontmatter.date || "",
            description: node.frontmatter.description || "",
            thumbnail:
              node.frontmatter.thumbnail?.publicURL ||
              node.frontmatter.thumbnail ||
              "",
            content: content,
          })
          setFetching(false)
          return
        } catch (e) {
          console.warn("Could not fetch markdown content:", e)
          // Still set the article with frontmatter data, content will be empty
          setArticle({
            title: node.frontmatter.title || "",
            date: node.frontmatter.date || "",
            description: node.frontmatter.description || "",
            thumbnail:
              node.frontmatter.thumbnail?.publicURL ||
              node.frontmatter.thumbnail ||
              "",
            content: "",
          })
          setFetching(false)
          return
        }
      }
    }

    // Fallback: Try Netlify Functions
    try {
      const token = getAuthToken()
      const response = await fetch(
        `/.netlify/functions/get-article?slug=${encodeURIComponent(slug)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.ok) {
        const result = await response.json()
        setArticle(result.article)
        setFetching(false)
        return
      }
    } catch (error) {
      console.warn("Netlify Functions not available:", error)
    }

    // If all else fails
    window.alert("Failed to load article. Please make sure the article exists.")
    navigate("/admin")
    setFetching(false)
  }

  if (loading || fetching) {
    return (
      <Layout>
        <SEO title="Edit Case Study" />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading article...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <Layout>
      <SEO title="Edit Article" />
      <ArticleEditor article={article} slug={slug} />
    </Layout>
  )
}

export default EditArticlePage

export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            description
            thumbnail {
              publicURL
            }
          }
        }
      }
    }
  }
`
