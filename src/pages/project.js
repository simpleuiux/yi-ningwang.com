import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostCard from "../components/postCard"

// import "../utils/global.scss"
import "../utils/normalize.css"
import "../utils/css/screen.css"
//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const BlogIndex = ({ data }, location) => {
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    let postCounter = 0

    return (
        <Layout title={siteTitle}>
            <SEO
                title="All posts"
                keywords={[`blog`, `gatsby`, `javascript`, `react`]}
            />
            {/* <Bio /> */}
            <article className="post-content page-template no-image">
                <div className="post-content-body">
                    <h1 id="clean-minimal-and-deeply-customisable-london-is-a-theme-made-for-people-who-appreciate-simple-lines-"><br />
                        Clean, minimal, and modern UI/UX design. <br /> Follow me on {" "}
                        <a href="https://dribbble.com/simpleuiux">
                            dribbble
            </a>{" "}and{" "}
                        <a href="https://medium.com/@simpleuiux">
                            medium
            </a>{" "}
                    </h1>
                </div>
            </article>
            <br /><br /><br /><br />
            <div className="post-feed">
                {posts.map(({ node }) => {
                    postCounter++
                    return (
                        <PostCard
                            key={node.fields.slug}
                            count={postCounter}
                            node={node}
                            postClass={`post`}
                        />
                    )
                })}
            </div>
        </Layout>
    )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 1360) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default props => (
    <StaticQuery
        query={indexQuery}
        render={data => (
            <BlogIndex location={props.location} props data={data} {...props} />
        )}
    />
)
