import React, { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext({})

// Admin credentials
const ADMIN_USERNAME = "anniewang"
const ADMIN_PASSWORD = "anniewanguxqueen"

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("admin_user")
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          // Check if session is still valid (24 hours)
          if (userData.expires && userData.expires > Date.now()) {
            setUser(userData)
          } else {
            localStorage.removeItem("admin_user")
          }
        } catch (e) {
          localStorage.removeItem("admin_user")
        }
      }
      setLoading(false)
    }
  }, [])

  const login = async (username, password) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Generate a simple token (in production, use a proper JWT or session token)
      const token = btoa(`${ADMIN_USERNAME}:${Date.now()}`)
      const userData = {
        username: ADMIN_USERNAME,
        email: `${ADMIN_USERNAME}@admin.local`,
        token: token,
        expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      }
      setUser(userData)
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_user", JSON.stringify(userData))
        localStorage.setItem("admin_token", token)
      }
      return { success: true }
    }
    return { success: false, error: "Invalid username or password" }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_user")
      localStorage.removeItem("admin_token")
    }
  }

  const getAuthToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_token")
    }
    return null
  }

  const value = {
    user,
    loading,
    login,
    logout,
    getAuthToken,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
