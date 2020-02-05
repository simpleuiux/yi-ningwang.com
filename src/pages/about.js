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
          <h1 id="clean-minimal-and-deeply-customisable-london-is-a-theme-made-for-people-who-appreciate-simple-lines-">
            Clean, minimal, and modern UI/UX design. <br /> Follow me on {" "}
            <a href="https://dribbble.com/simpleuiux">
              dribbble
            </a>{" "}and{" "}
            <a href="https://medium.com/@simpleuiux">
              medium
            </a>{" "}
          </h1>
          <br /><br /><br /><br />

          <h4 id="dynamic-styles">I help digital product work</h4>
          <p>
            With my diversed background in <b>design, communication and business</b>,
            I help business decide on the right solutions for digital products.
            I aim not only to make the product look pretty,
            but also to make it work - <b>happy users</b> will result in a more <b>profitable business</b>.
            I am a firm believer in understanding the human interactoin design and the target audience.
            User wants to have a <b>great experience –
            from start to finish</b> – and I help to make that happen.
          </p>
          <h4 id="dynamic-styles">Work experience</h4>
          <p>
            I started career as a journalist and researcher for 5+ years,
            with extensive interviewing experiences across 20+ countries across
            North America, Africa, Europe and East Asia.
            I help start-ups and MNCs created 5+ business plans.
            From 2016, I dived into UX world from one of my clients projects. Since then, I have provided UX / UI research and design
            for industries from <b>Fintech, Banking, NGO, Healthcare, to Data Analysis</b>.
          </p>
          <p>Co-founder of a Canadian-based Tech design studio - {" "}
            <a href="https://docs.ghost.org/integrations/">
              SassyTech
            </a>{" "}.​​​​​​​</p>
          <p>
            <h6 id="dynamic-styles">Recognition</h6>
            2019 - 2020  UX Planet -  UI / UX writer<br />
            2019       Girls in Tech Hackathon - 1st Place<br />
            <h6 id="dynamic-styles">Design workshop</h6>
            2018 - 2020  International Design Foundation<br />
            2016 - 2017  World's Top 50 Thinkers workshop - Hermann Simon (Branding)<br />
            2015 - 2016  World's Top 50 Thinkers workshop - Alex Osterwalder (UX)<br />
            2014 - 2015  TAITRA - Market Research and Branding<br />
            <h6 id="dynamic-styles">Educational background</h6>
            2014 - 2016 National Chiao Tung University - Global MBA <br /> (World's Top 100 in entrepreneurship)<br />
            2006 - 2010 University of Cheng Chi University - Media and Communication <br />(Top 1 Nation-wide)<br />
          </p>


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
      <AboutPage location={props.location} data={data} {...props} />
    )}
  />
)
