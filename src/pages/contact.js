import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const ContactPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <SEO title="About" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />

      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h1 id="want-to-chat-hit-me-up-on-linkedin-messenger-or-drop-me-an-email"><br />
            Want to chat? Hit me up on {" "}
            <a href="https://www.linkedin.com/in/annieyiningwang/">
              Linkedin
                        </a>{" "},{" "}
            <a href="https://m.me/annieynwang">
              Messenger
                        </a>{" "}or drop me an {" "}
            <a href="mailto:simpleuiux@gmail.com">
              Email
                        </a>{" "}.
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
      relativePath: { eq: "bench-accounting-49909-unsplash.jpg" }
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
      <ContactPage location={props.location} data={data} {...props} />
    )}
  />
)
