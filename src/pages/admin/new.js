import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import { useAuth } from "../../contexts/AuthContext"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import ArticleEditor from "../../components/ArticleEditor"

const NewArticlePage = () => {
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/admin/login")
    }
  }, [loading, isAuthenticated])

  if (loading) {
    return (
      <Layout>
        <SEO title="New Article" />
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Loading...</p>
        </div>
      </Layout>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <Layout>
      <SEO title="New Article" />
      <ArticleEditor />
    </Layout>
  )
}

export default NewArticlePage
