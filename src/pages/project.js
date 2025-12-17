import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostCard from "../components/postCard"

// import "../utils/global.scss"
import "../utils/normalize.css"
import "../utils/css/screen.css"
import Particles from "react-particles-js"

//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const BlogIndex = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  // Filter to show only articles in the Writing section
  const articles = posts.filter(
    ({ node }) => node.frontmatter.type === "article" || !node.frontmatter.type
  )
  let postCounter = 0

  return (
    <Layout title={siteTitle}>
      <SEO
        title="WRITING"
        keywords={[`blog`, `writing`, `articles`, `thoughts`]}
      />

      <Particles
        style={{ position: "absolute", zIndex: "-99" }}
        params={{
          particles: {
            number: {
              value: 40,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#bebebe",
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "#bebebe",
              },
              polygon: {
                nb_sides: 4,
              },
              image: {
                src: "",
                width: 100,
                height: 100,
              },
            },
            opacity: {
              value: 0.5,
              random: false,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 200,
              color: "#bebebe",
              opacity: 1,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
            array: [],
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 400,
                size: 20,
                duration: 2,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
            mouse: {},
          },
          retina_detect: true,
          fn: {
            interact: {},
            modes: {},
            vendors: {},
          },
          tmp: {},
        }}
      />

      {/* <Bio /> */}
      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h1 id="clean-minimal-and-deeply-customisable-london-is-a-theme-made-for-people-who-appreciate-simple-lines-">
            <br />
            Thoughts, insights, and stories. <br /> Read more on{" "}
            <a href="https://medium.com/@annieuxjourney" target="_blank">
              Medium
            </a>{" "}
            and follow me on{" "}
            <a href="https://dribbble.com/annieuxjourney" target="_blank">
              Dribbble.
            </a>{" "}
          </h1>
        </div>
      </article>
      <br />
      <br />
      <br />
      <br />
      <div className="post-feed">
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-3xl text-gray-600">No articles yet</h3>
            <p className="text-xl text-gray-500 mt-2">
              Check back soon for new writing!
            </p>
          </div>
        ) : (
          articles.map(({ node }) => {
            postCounter++
            return (
              <PostCard
                key={node.fields.slug}
                count={postCounter}
                node={node}
                postClass={`post`}
              />
            )
          })
        )}
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
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
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
            type
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 1360, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`

export default (props) => (
  <StaticQuery
    query={indexQuery}
    render={(data) => (
      <BlogIndex location={props.location} props data={data} {...props} />
    )}
  />
)
