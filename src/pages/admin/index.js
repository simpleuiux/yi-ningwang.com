import React, { useEffect, useState } from "react"
import { navigate, Link, graphql } from "gatsby"
import { useAuth } from "../../contexts/AuthContext"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const AdminDashboard = ({ data }) => {
  const { user, logout, loading, isAuthenticated, getAuthToken } = useAuth()
  const [articles, setArticles] = useState([])
  const [fetching, setFetching] = useState(true)
  const [deletedArticles, setDeletedArticles] = useState([])
  const [showUndo, setShowUndo] = useState(false)
  const [undoTimeout, setUndoTimeout] = useState(null)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/admin/login")
    }
  }, [loading, isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      fetchArticles()
    }
  }, [isAuthenticated])

  // Load deleted articles from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("deleted_articles")
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setDeletedArticles(parsed)
          if (parsed.length > 0) {
            setShowUndo(true)
          }
        } catch (e) {
          console.error("Error loading deleted articles:", e)
        }
      }
    }
  }, [])

  const fetchArticles = async () => {
    setFetching(true)

    if (data && data.allMarkdownRemark && data.allMarkdownRemark.edges) {
      const graphqlArticles = data.allMarkdownRemark.edges.map(({ node }) => ({
        slug: node.fields.slug,
        title: node.frontmatter.title || "",
        date: node.frontmatter.date || "",
        description: node.frontmatter.description || "",
        thumbnail:
          node.frontmatter.thumbnail?.publicURL ||
          node.frontmatter.thumbnail ||
          "",
      }))
      setArticles(graphqlArticles)
      setFetching(false)
      return
    }

    try {
      const token = getAuthToken()
      const response = await fetch("/.netlify/functions/list-articles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const result = await response.json()
        setArticles(result.articles || [])
        setFetching(false)
        return
      }
    } catch (error) {
      console.warn("Netlify Functions not available:", error)
    }

    setArticles([])
    setFetching(false)
  }

  const handleDelete = async (slug, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return
    }

    const articleToDelete = articles.find((a) => a.slug === slug)
    if (!articleToDelete) return

    try {
      const token = getAuthToken()

      const getResponse = await fetch(
        `/.netlify/functions/get-article?slug=${encodeURIComponent(slug.replace(/^\//, ""))}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      let fullArticleData = articleToDelete
      if (getResponse.ok) {
        const result = await getResponse.json()
        fullArticleData = result.article
      }

      const response = await fetch("/.netlify/functions/delete-article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ slug }),
      })

      if (response.ok) {
        setArticles(articles.filter((article) => article.slug !== slug))

        const deletedWithTimestamp = {
          ...fullArticleData,
          deletedAt: Date.now(),
        }
        const newDeleted = [deletedWithTimestamp, ...deletedArticles]
        setDeletedArticles(newDeleted)
        setShowUndo(true)

        if (typeof window !== "undefined") {
          localStorage.setItem("deleted_articles", JSON.stringify(newDeleted))
        }

        if (undoTimeout) {
          clearTimeout(undoTimeout)
        }
        const timeout = setTimeout(() => {
          setShowUndo(false)
        }, 10000)
        setUndoTimeout(timeout)
      } else {
        window.alert("Failed to delete article")
      }
    } catch (error) {
      console.error("Error deleting article:", error)
      window.alert("Error deleting article")
    }
  }

  const handleUndo = async () => {
    if (deletedArticles.length === 0) return

    const lastDeleted = deletedArticles[0]

    try {
      const token = getAuthToken()

      const response = await fetch("/.netlify/functions/create-article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: lastDeleted.title,
          description: lastDeleted.description || "",
          date: lastDeleted.date || new Date().toISOString().slice(0, 10),
          thumbnail: lastDeleted.thumbnail || "",
          content: lastDeleted.content || "",
          slug: lastDeleted.slug.replace(/^\//, ""),
        }),
      })

      if (response.ok) {
        const newDeleted = deletedArticles.slice(1)
        setDeletedArticles(newDeleted)
        if (newDeleted.length === 0) {
          setShowUndo(false)
        }

        if (typeof window !== "undefined") {
          localStorage.setItem("deleted_articles", JSON.stringify(newDeleted))
        }

        if (undoTimeout) {
          clearTimeout(undoTimeout)
        }

        await fetchArticles()
      } else {
        const error = await response.json()
        window.alert(error.error || "Failed to restore article")
      }
    } catch (error) {
      console.error("Error undoing delete:", error)
      window.alert("Error restoring article")
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "No date"
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffTime = Math.abs(now - date)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 1) return "Updated today"
      if (diffDays === 2) return "Updated yesterday"
      if (diffDays <= 7) return `Updated ${diffDays - 1} days ago`

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    } catch {
      return dateString
    }
  }

  const getWordCount = (content) => {
    if (!content) return 0
    return content.split(/\s+/).filter((word) => word.length > 0).length
  }

  const getReadTime = (wordCount) => {
    const wordsPerMinute = 200
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return minutes
  }

  if (loading || fetching) {
    return (
      <Layout>
        <SEO title="Admin Dashboard" />
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="text-center">
            <div
              className="inline-block animate-spin rounded-full h-12 w-12 border-b-2"
              style={{ borderColor: "#26a8ed" }}
            ></div>
            <p className="mt-4 text-gray-600 text-lg">Loading...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const filteredArticles = activeTab === "all" ? articles : articles

  return (
    <Layout>
      <SEO title="Admin Dashboard" />
      <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
        {/* Undo Notification */}
        {showUndo && deletedArticles.length > 0 && (
          <div
            className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4"
            style={{ borderLeftColor: "#fbbf24" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-yellow-400 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-xl font-medium text-yellow-800">
                    Case Study "{deletedArticles[0].title}" was deleted.
                  </p>
                </div>
                <button
                  onClick={handleUndo}
                  className="ml-4 px-12 py-6 text-2xl font-medium text-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: "#26a8ed" }}
                >
                  Undo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-6xl font-bold text-gray-900 mb-3">
                Case Studies
              </h1>
              <p className="text-2xl text-gray-500">
                Manage your portfolio case studies
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchArticles}
                className="flex items-center justify-center px-12 py-7 text-2xl font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 h-20"
              >
                <svg
                  className="w-12 h-12 mr-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh
              </button>
              <Link
                to="/admin/new"
                className="flex items-center justify-center px-12 py-7 text-2xl font-medium text-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-md h-20"
                style={{ backgroundColor: "#26a8ed" }}
              >
                <svg
                  className="w-12 h-12 mr-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New Case Study
              </Link>
              <button
                onClick={logout}
                className="flex items-center justify-center px-12 py-7 text-2xl font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 h-20"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Articles List */}
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <div
                className="mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(38, 168, 237, 0.1)" }}
              >
                <svg
                  className="w-12 h-12"
                  style={{ color: "#26a8ed" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-medium text-gray-900 mb-2">
                No case studies yet
              </h3>
              <p className="text-xl text-gray-500 mb-6">
                Get started by creating your first portfolio case study.
              </p>
              <Link
                to="/admin/new"
                className="inline-flex items-center px-14 py-8 text-2xl font-medium text-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
                style={{ backgroundColor: "#26a8ed" }}
              >
                <svg
                  className="w-14 h-14 mr-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Your First Case Study
              </Link>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Latest
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map((article, index) => {
                  // Calculate word count and read time (we'll need to fetch content for this)
                  const wordCount = article.content
                    ? getWordCount(article.content)
                    : 0
                  const readTime = wordCount > 0 ? getReadTime(wordCount) : 0

                  return (
                    <div
                      key={article.slug}
                      className="flex flex-col p-5 rounded-lg border border-gray-200 transition-all duration-150 bg-white"
                    >
                      {/* Thumbnail */}
                      <div
                        className="w-full rounded-lg overflow-hidden bg-gray-200 mb-4"
                        style={{ minHeight: "200px" }}
                      >
                        {article.thumbnail ? (
                          <img
                            src={article.thumbnail}
                            alt={article.title}
                            className="w-full h-auto object-contain"
                          />
                        ) : (
                          <div
                            className="w-full h-64 flex items-center justify-center"
                            style={{
                              backgroundColor: "rgba(38, 168, 237, 0.1)",
                            }}
                          >
                            <svg
                              className="w-20 h-20"
                              style={{ color: "#26a8ed" }}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col">
                        <Link
                          to={article.slug}
                          className="text-4xl font-semibold text-gray-900 hover:underline mb-3 block"
                        >
                          {article.title}
                        </Link>
                        <div className="flex items-center space-x-2 text-2xl text-gray-600 mb-3">
                          {readTime > 0 && (
                            <>
                              <span>{readTime} min read</span>
                              <span>·</span>
                              <span>{wordCount} words</span>
                              <span>·</span>
                            </>
                          )}
                          <span className="font-medium">
                            {formatDate(article.date)}
                          </span>
                        </div>
                        {article.description && (
                          <p className="text-2xl text-gray-600 line-clamp-2 mb-3">
                            {article.description}
                          </p>
                        )}
                        <div className="flex items-center space-x-3 mt-2 mb-4">
                          <span className="text-xl font-mono text-gray-600 font-medium">
                            {article.slug}
                          </span>
                        </div>

                        {/* Actions Menu */}
                        <div className="flex items-center space-x-4 mt-auto pt-4">
                          <Link
                            to={`/admin/edit?slug=${encodeURIComponent(article.slug.replace(/^\//, ""))}`}
                            className="inline-flex items-center justify-center flex-1 px-8 py-4 text-2xl font-medium rounded-lg transition-all duration-200 h-16"
                            style={{
                              color: "#26a8ed",
                              backgroundColor: "rgba(38, 168, 237, 0.1)",
                              border: "1px solid rgba(38, 168, 237, 0.2)",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor =
                                "rgba(38, 168, 237, 0.2)"
                              e.target.style.boxShadow =
                                "0 1px 3px rgba(0, 0, 0, 0.1)"
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor =
                                "rgba(38, 168, 237, 0.1)"
                              e.target.style.boxShadow = "none"
                            }}
                          >
                            <svg
                              className="w-10 h-10 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            Edit
                          </Link>
                          <button
                            onClick={() =>
                              handleDelete(article.slug, article.title)
                            }
                            className="delete-button inline-flex items-center justify-center flex-1 px-8 py-4 text-2xl font-medium rounded-lg transition-all duration-200 h-16"
                            style={{
                              color: "#dc2626 !important",
                              backgroundColor: "transparent !important",
                              border: "2px solid #dc2626 !important",
                              outline: "none !important",
                              boxShadow: "none !important",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.boxShadow = "none !important"
                              e.target.style.border =
                                "2px solid #dc2626 !important"
                              e.target.style.backgroundColor =
                                "rgba(220, 38, 38, 0.05)"
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.boxShadow = "none !important"
                              e.target.style.border =
                                "2px solid #dc2626 !important"
                              e.target.style.backgroundColor = "transparent"
                            }}
                            onFocus={(e) => {
                              e.target.style.outline = "none !important"
                              e.target.style.boxShadow = "none !important"
                              e.target.style.border =
                                "2px solid #dc2626 !important"
                            }}
                            onBlur={(e) => {
                              e.target.style.outline = "none !important"
                              e.target.style.boxShadow = "none !important"
                              e.target.style.border =
                                "2px solid #dc2626 !important"
                            }}
                          >
                            <svg
                              className="w-10 h-10 mr-3"
                              fill="none"
                              stroke="#dc2626"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              style={{ color: "#dc2626" }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                stroke="#dc2626"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            <span style={{ color: "#dc2626" }}>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard

export const query = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
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
