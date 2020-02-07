import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const AboutPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <SEO title="About" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />

      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h1 id="hi-im-yining-i-design-stuff">
            <br />
            Hi! I'm {" "}
            <a href="http://localhost:8000/about">
              Yining</a>{""}.<br />
            I {" "}
            <a href="http://localhost:8000/project">
              design</a>{""} ideas.
                    </h1>


        </div>
      </article>
    </Layout >
  )
}

const indexQuery = graphql`
  query {
          site {
        siteMetadata {
          title
        }
        }
        benchAccounting: file(
      relativePath: {eq: "bench-accounting-49909-unsplash.jpg" }
    ) {
          childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
        }
      }
    }
  `

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <AboutPage location={props.location} data={data} {...props} />
    )}
  />
)
