import React, { useState, useEffect } from "react"
import { navigate, Link } from "gatsby"
import { useAuth } from "../contexts/AuthContext"

const ArticleEditor = ({ article, slug: existingSlug }) => {
  const { logout, getAuthToken } = useAuth()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [content, setContent] = useState("")
  const [slug, setSlug] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (article) {
      setTitle(article.title || "")
      setDescription(article.description || "")
      setDate(article.date || new Date().toISOString().slice(0, 10))
      setThumbnail(article.thumbnail || "")
      setContent(article.content || "")
      setSlug(existingSlug || "")
    } else {
      setDate(new Date().toISOString().slice(0, 10))
    }
  }, [article, existingSlug])

  const generateSlug = (title) => {
    return String(title || "")
      .trim()
      .toLowerCase()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  const handleTitleChange = (e) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    if (!existingSlug) {
      setSlug(generateSlug(newTitle))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const articleData = {
        title,
        description,
        date,
        thumbnail,
        content,
        slug: slug || generateSlug(title),
      }

      const url = existingSlug
        ? "/.netlify/functions/update-article"
        : "/.netlify/functions/create-article"

      const method = existingSlug ? "POST" : "POST"
      const token = getAuthToken()

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...articleData,
          ...(existingSlug && { oldSlug: existingSlug }),
        }),
      })

      if (response.ok) {
        navigate("/admin")
      } else {
        const error = await response.json()
        window.alert(error.message || "Failed to save article")
      }
    } catch (error) {
      console.error("Error saving article:", error)
      window.alert("Error saving article")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div
          className="bg-white rounded-xl shadow-sm border mb-6"
          style={{ borderColor: "#e5e7eb" }}
        >
          <div
            className="px-6 py-5 border-b"
            style={{ borderColor: "#e5e7eb", backgroundColor: "#fafafa" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-8xl font-bold text-gray-900">
                  {existingSlug ? "Edit Article" : "New Article"}
                </h1>
                <p className="mt-2 text-2xl text-gray-600">
                  {existingSlug
                    ? "Update your article content"
                    : "Create a new portfolio article"}
                </p>
              </div>
              <Link
                to="/admin"
                className="inline-flex items-center px-8 py-4 border border-gray-300 shadow-sm text-2xl font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <svg
                  className="w-8 h-8 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back
              </Link>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border overflow-hidden"
          style={{ borderColor: "#e5e7eb" }}
        >
          <div className="px-6 py-6 space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-2xl font-semibold text-gray-700 mb-2"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                required
                className="block w-full px-5 py-4 text-2xl border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200"
                style={{
                  focusRingColor: "#26a8ed",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#26a8ed")}
                onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                placeholder="Enter article title"
              />
            </div>

            {/* Slug */}
            <div>
              <label
                htmlFor="slug"
                className="block text-2xl font-semibold text-gray-700 mb-2"
              >
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                disabled={!!existingSlug}
                className={`block w-full px-5 py-4 text-2xl border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 font-mono transition-all duration-200 ${
                  existingSlug ? "bg-gray-50 cursor-not-allowed" : ""
                }`}
                onFocus={(e) =>
                  !existingSlug && (e.target.style.borderColor = "#26a8ed")
                }
                onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                placeholder="article-slug"
              />
              {existingSlug && (
                <p className="mt-2 text-base text-gray-500">
                  Slug cannot be changed after creation
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date */}
              <div>
                <label
                  htmlFor="date"
                  className="block text-2xl font-semibold text-gray-700 mb-2"
                >
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="block w-full px-5 py-4 text-2xl border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-all duration-200"
                  onFocus={(e) => (e.target.style.borderColor = "#26a8ed")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
              </div>

              {/* Thumbnail */}
              <div>
                <label
                  htmlFor="thumbnail"
                  className="block text-2xl font-semibold text-gray-700 mb-2"
                >
                  Thumbnail
                </label>
                <input
                  type="text"
                  id="thumbnail"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="./thumbnail.png"
                  className="block w-full px-5 py-4 text-2xl border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 font-mono transition-all duration-200"
                  onFocus={(e) => (e.target.style.borderColor = "#26a8ed")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-2xl font-semibold text-gray-700 mb-2"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full px-5 py-4 text-2xl border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200"
                onFocus={(e) => (e.target.style.borderColor = "#26a8ed")}
                onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                placeholder="Brief description of the article"
              />
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="block text-2xl font-semibold text-gray-700 mb-2"
              >
                Content (Markdown) <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={24}
                className="block w-full px-5 py-4 text-2xl border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 font-mono transition-all duration-200"
                style={{ resize: "vertical" }}
                onFocus={(e) => (e.target.style.borderColor = "#26a8ed")}
                onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                placeholder="Write your article content in Markdown..."
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div
            className="px-6 py-4 bg-gray-50 border-t flex items-center justify-end space-x-3"
            style={{ borderColor: "#e5e7eb" }}
          >
            <Link
              to="/admin"
              className="px-6 py-3 border border-gray-300 shadow-sm text-2xl font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className={`inline-flex items-center px-7 py-3 border border-transparent text-2xl rounded-lg shadow-lg transition-all duration-200 ${
                saving ? "bg-gray-400 cursor-not-allowed" : "hover:shadow-xl"
              }`}
              style={{
                backgroundColor: saving ? "#9ca3af" : "#26a8ed",
                color: "#ffffff",
                fontWeight: 500,
              }}
            >
              {saving ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#ffffff"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#ffffff"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="#ffffff"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span style={{ color: "#fff" }}>Saving...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="#ffffff"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span style={{ color: "#fff" }}>Save Article</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ArticleEditor
