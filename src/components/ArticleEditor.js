import React, { useState, useEffect } from "react"
import { navigate, Link } from "gatsby"
import { useAuth } from "../contexts/AuthContext"
import TurndownService from "turndown"
import { marked } from "marked"

// Dynamically import ReactQuill to avoid SSR issues with Gatsby
let ReactQuill = null
if (typeof window !== "undefined") {
  ReactQuill = require("react-quill").default
  require("react-quill/dist/quill.snow.css")
}

const ArticleEditor = ({ article, slug: existingSlug }) => {
  const { logout, getAuthToken } = useAuth()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [content, setContent] = useState("")
  const [slug, setSlug] = useState("")
  const [type, setType] = useState("case-study")
  const [saving, setSaving] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [editorMode, setEditorMode] = useState("markdown") // "markdown" or "richtext"
  const contentRef = React.useRef(null)

  // Initialize turndown service for HTML to Markdown conversion
  const turndownService = React.useMemo(() => {
    if (typeof window !== "undefined") {
      return new TurndownService({
        headingStyle: "atx",
        codeBlockStyle: "fenced",
      })
    }
    return null
  }, [])

  useEffect(() => {
    if (article) {
      setTitle(article.title || "")
      setDescription(article.description || "")
      setDate(article.date || new Date().toISOString().slice(0, 10))
      setThumbnail(article.thumbnail || "")
      setContent(article.content || "")
      setSlug(existingSlug || "")
      setType(article.type || "case-study")
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

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))

    if (imageFiles.length === 0) {
      alert("Please drop image files only")
      return
    }

    for (const file of imageFiles) {
      await handleImageUpload(file)
    }
  }

  const handleImageUpload = async (file) => {
    setUploading(true)

    try {
      // Convert image to base64 data URL
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target.result

        // Get cursor position
        const textarea = contentRef.current
        const cursorPos = textarea ? textarea.selectionStart : content.length

        // Create markdown image syntax
        const imageName = file.name.replace(/\.[^/.]+$/, "")
        const imageMarkdown = `\n\n![${imageName}](${file.name})\n\n`

        // Insert at cursor position
        const newContent =
          content.substring(0, cursorPos) +
          imageMarkdown +
          content.substring(cursorPos)

        setContent(newContent)
        setUploading(false)

        // Show message about manual upload
        alert(
          `Image "${file.name}" markdown added!\n\nNote: Please manually upload "${file.name}" to your case study folder after saving.`
        )
      }

      reader.onerror = () => {
        setUploading(false)
        alert("Error reading image file")
      }

      reader.readAsDataURL(file)
    } catch (error) {
      console.error("Error uploading image:", error)
      setUploading(false)
      alert("Failed to process image")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Convert HTML to Markdown if in rich text mode
      let finalContent = content
      if (editorMode === "richtext" && turndownService) {
        finalContent = turndownService.turndown(content)
      }

      const articleData = {
        title,
        description,
        date,
        thumbnail,
        content: finalContent,
        slug: slug || generateSlug(title),
        type,
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
                  {existingSlug ? "Edit Case Study" : "New Case Study"}
                </h1>
                <p className="mt-2 text-2xl text-gray-600">
                  {existingSlug
                    ? "Update your case study content"
                    : "Create a new portfolio case study"}
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
                placeholder="Enter case study title"
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
                placeholder="case-study-slug"
              />
              {existingSlug && (
                <p className="mt-2 text-base text-gray-500">
                  Slug cannot be changed after creation
                </p>
              )}
            </div>

            {/* Type */}
            <div>
              <label
                htmlFor="type"
                className="block text-2xl font-semibold text-gray-700 mb-2"
              >
                Type <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="block w-full px-5 py-4 text-2xl border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-all duration-200"
                style={{ cursor: "pointer" }}
                onFocus={(e) => (e.target.style.borderColor = "#26a8ed")}
                onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
              >
                <option value="case-study">Case Study (Portfolio Work)</option>
                <option value="article">Article (Blog/Writing)</option>
              </select>
              <p className="mt-2 text-lg text-gray-500">
                💡 Case Studies appear in your portfolio, Articles appear in the
                Writing section
              </p>
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
                placeholder="Brief description of the case study"
              />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="content"
                  className="block text-2xl font-semibold text-gray-700"
                >
                  Content <span className="text-red-500">*</span>
                  {uploading && (
                    <span className="ml-3 text-blue-500 text-lg">
                      Processing image...
                    </span>
                  )}
                </label>
                <div className="flex rounded-lg overflow-hidden border border-gray-300">
                  <button
                    type="button"
                    onClick={() => {
                      if (editorMode === "richtext" && turndownService) {
                        // Convert HTML to Markdown
                        const markdown = turndownService.turndown(content)
                        setContent(markdown)
                      }
                      setEditorMode("markdown")
                    }}
                    className={`px-6 py-2 text-lg font-medium transition-colors ${
                      editorMode === "markdown"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    ✍️ Markdown
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (editorMode === "markdown") {
                        // Convert Markdown to HTML
                        const html = marked(content || "")
                        setContent(html)
                      }
                      setEditorMode("richtext")
                    }}
                    className={`px-6 py-2 text-lg font-medium transition-colors border-l border-gray-300 ${
                      editorMode === "richtext"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    📝 Rich Text
                  </button>
                </div>
              </div>

              {editorMode === "markdown" ? (
                <div className="relative">
                  <textarea
                    ref={contentRef}
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    required
                    rows={24}
                    className={`block w-full px-5 py-4 text-2xl border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 font-mono transition-all duration-200 ${
                      isDragging
                        ? "border-blue-500 bg-blue-50 border-4"
                        : "border-gray-300"
                    }`}
                    style={{ resize: "vertical" }}
                    onFocus={(e) => (e.target.style.borderColor = "#26a8ed")}
                    onBlur={(e) =>
                      !isDragging && (e.target.style.borderColor = "#d1d5db")
                    }
                    placeholder="Write your case study content in Markdown... (You can drag & drop images here!)"
                  />
                  {isDragging && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-blue-50 bg-opacity-90 rounded-lg border-4 border-blue-500 border-dashed">
                      <div className="text-center">
                        <svg
                          className="mx-auto h-16 w-16 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="mt-2 text-2xl font-semibold text-blue-600">
                          Drop images here
                        </p>
                        <p className="text-lg text-blue-500">
                          Images will be inserted at cursor position
                        </p>
                      </div>
                    </div>
                  )}
                  <p className="mt-2 text-lg text-gray-500">
                    💡 Tip: Drag and drop images into the editor to insert them
                    at your cursor position
                  </p>
                </div>
              ) : (
                ReactQuill && (
                  <div className="rich-text-editor">
                    <ReactQuill
                      value={content}
                      onChange={setContent}
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, 3, false] }],
                          ["bold", "italic", "underline", "strike"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["blockquote", "code-block"],
                          ["link", "image"],
                          [{ align: [] }],
                          ["clean"],
                        ],
                      }}
                      formats={[
                        "header",
                        "bold",
                        "italic",
                        "underline",
                        "strike",
                        "list",
                        "bullet",
                        "blockquote",
                        "code-block",
                        "link",
                        "image",
                        "align",
                      ]}
                      placeholder="Start writing your content... Just like Medium!"
                      theme="snow"
                      style={{ height: "600px", marginBottom: "60px" }}
                    />
                    <p className="mt-2 text-lg text-gray-500">
                      💡 Tip: Use the toolbar above to format your text. Switch
                      to Markdown mode to see the raw markdown.
                    </p>
                  </div>
                )
              )}
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
                  <span style={{ color: "#fff" }}>Save Case Study</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Custom Styles for Rich Text Editor */}
      <style jsx>{`
        :global(.rich-text-editor .ql-container) {
          font-size: 18px;
          font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
            "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
            sans-serif;
        }

        :global(.rich-text-editor .ql-editor) {
          min-height: 500px;
          padding: 20px;
        }

        :global(.rich-text-editor .ql-toolbar) {
          border-radius: 8px 8px 0 0;
          background: #f9fafb;
        }

        :global(.rich-text-editor .ql-container) {
          border-radius: 0 0 8px 8px;
        }

        :global(.rich-text-editor .ql-editor.ql-blank::before) {
          color: #9ca3af;
          font-style: normal;
        }
      `}</style>
    </div>
  )
}

export default ArticleEditor
