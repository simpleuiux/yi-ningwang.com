import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"
import Particles from 'react-particles-js'


const AboutPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <SEO title="About" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />

      <Particles style={{ position: 'absolute', zIndex: '-99' }}
        params={{
          particles: {

            number: {
              value: 100,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: '#bebebe'
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0.5,
                color: '#bebebe'
              },
              polygon: {
                nb_sides: 4
              },
              image: {
                src: '',
                width: 100,
                height: 100
              }
            },
            opacity: {
              value: 0.5,
              random: false,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
              }
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
              }
            },
            line_linked: {
              enable: true,
              distance: 200,
              color: '#eee',
              opacity: 1,
              width: 1
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
              }
            },
            array: []
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'repulse'
              },
              onclick: {
                enable: true,
                mode: 'push'
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1
                }
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2
              },
              repulse: {
                distance: 200,
                duration: 0.4
              },
              push: {
                particles_nb: 4
              },
              remove: {
                particles_nb: 2
              }
            },
            mouse: {}
          },
          retina_detect: true,
          fn: {
            interact: {},
            modes: {},
            vendors: {}
          },
          tmp: {}
        }

        } />


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
