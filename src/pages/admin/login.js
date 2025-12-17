import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import { useAuth } from "../../contexts/AuthContext"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const LoginPage = () => {
  const { user, login, loading } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (user && !loading) {
      navigate("/admin")
    }
  }, [user, loading])

  const handleSubmit = async e => {
    e.preventDefault()
    setError("")
    setSubmitting(true)

    const result = await login(username, password)

    if (result.success) {
      navigate("/admin")
    } else {
      setError(result.error || "Invalid credentials")
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <SEO title="Admin Login" />
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <div className="text-center">
            <div
              className="inline-block animate-spin rounded-full h-12 w-12 border-b-2"
              style={{ borderColor: "#26a8ed" }}
            ></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (user) {
    return null
  }

  return (
    <Layout>
      <SEO title="Admin Login" />
      <div
        className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="max-w-md w-full">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div
              className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
              style={{ backgroundColor: "#26a8ed" }}
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Admin Login</h2>
            <p className="mt-2 text-lg text-gray-600">
              Sign in to manage your portfolio
            </p>
          </div>

          {/* Login Card */}
          <div
            className="bg-white rounded-2xl shadow-lg border overflow-hidden"
            style={{ borderColor: "#e5e7eb" }}
          >
            <form className="p-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div
                  className="rounded-lg p-4"
                  style={{
                    backgroundColor: "#fef2f2",
                    border: "1px solid #fecaca",
                  }}
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5"
                        style={{ color: "#dc2626" }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#dc2626" }}
                      >
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="username"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="block w-full px-5 py-4 text-lg border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200"
                  style={{
                    focusRingColor: "#26a8ed",
                  }}
                  onFocus={e => (e.target.style.borderColor = "#26a8ed")}
                  onBlur={e => (e.target.style.borderColor = "#d1d5db")}
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="block w-full px-5 py-4 text-lg border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200"
                  onFocus={e => (e.target.style.borderColor = "#26a8ed")}
                  onBlur={e => (e.target.style.borderColor = "#d1d5db")}
                  placeholder="Enter your password"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex justify-center items-center py-4 px-4 border border-transparent text-lg font-medium rounded-lg text-white shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#26a8ed" }}
                >
                  {submitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default LoginPage
