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
            Hi! I'm Yining.<br />
            I design ideas.
                    </h1>
          <br /><br /><br /><br /><br /><br /><br /><br />


          <h3 id="hi-im-yining-i-design-stuff">
            I'm a UX designer based in Vancouver.
            I'm passionate about travel, collaboration and shaping new designs
            through my activities as a creator, blogger and developer.
          </h3>
          <br /><br /><br /><br />

          <div className="row">
            <div className="col-6">
              <div
                style={{
                  padding: "1rem 0",
                  textAlign: "left",
                  background: "",
                }}
              >
                <div class="skill">
                  <div class="skill-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" id="skill-ui-icon">
                      <defs></defs>
                      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="light-bulb" fill-rule="nonzero" fill="#8F98E4">
                          <path d="M30,9.95510204 C20.9142857,9.95510204 14.3510204,16.7265306 13.3102041,24 C12.6612245,28.8489796 14.2285714,33.5755102 17.4857143,37.1510204 C20.3510204,40.2122449 21.9183673,44.3020408 21.9183673,48.5142857 L21.9061224,55.1510204 C21.9061224,57.8326531 24.122449,60 26.8653061,60 L33.2571429,60 C36,60 38.2163265,57.8326531 38.2163265,55.1510204 L38.2285714,48.5142857 C38.2285714,44.1795918 39.6612245,40.2122449 42.4040816,37.4081633 C45.4040816,34.3469388 46.9714286,30.3918367 46.9714286,26.3020408 C46.9591837,17.2285714 39.2571429,9.95510204 30,9.95510204 L30,9.95510204 Z M35.7306122,55.1510204 C35.7306122,56.4244898 34.6897959,57.4530612 33.3795918,57.4530612 L26.9877551,57.4530612 C25.677551,57.4530612 24.6367347,56.4367347 24.6367347,55.1510204 L24.6367347,52.2122449 L35.7183673,52.2122449 L35.7183673,55.1510204 L35.7306122,55.1510204 Z M40.5795918,35.6204082 C37.322449,38.9387755 35.6204082,43.5306122 35.6204082,48.5142857 L35.6204082,49.6653061 L24.5387755,49.6653061 L24.5387755,48.5142857 C24.5387755,43.7877551 22.5795918,39.0734694 19.322449,35.4979592 C16.4571429,32.4367347 15.2816327,28.4816327 15.7959184,24.3918367 C16.7142857,18.2693878 22.4081633,12.5142857 30.0122449,12.5142857 C37.9714286,12.5142857 44.3632653,18.7714286 44.3632653,26.3020408 C44.3632653,29.7428571 43.0530612,33.0612245 40.5795918,35.6204082 Z" id="Shape"></path>
                          <rect class="bulb-ray" id="bulb-ray1" x="0" y="27.5755102" width="6.39183673" height="2.55918367" fill="#fff"></rect>
                          <polygon class="bulb-ray" id="bulb-ray2" points="9.68571429 7.49387755 7.84897959 9.31836735 12.3183673 13.6163265 14.1428571 11.7918367" fill="#fff"></polygon>
                          <rect class="bulb-ray" id="bulb-ray3" x="28.6897959" y="0" width="2.60816327" height="6.12244898" fill="#fff"></rect>
                          <polygon class="bulb-ray" id="bulb-ray4" points="45.8081633 11.8040816 47.6326531 13.6285714 52.1020408 9.33061224 50.2653061 7.50612245" fill="#fff"></polygon>
                          <rect class="bulb-ray" id="bulb-ray5" x="53.6081633" y="27.5755102" width="6.39183673" height="2.55918367" fill="#fff"></rect>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h3>UX Designer</h3>
                  <p>I'm a UX designer with 3+ years of experience. I am currently a UX designer at Red Academy in Vancouver.</p>
                </div>

              </div>
            </div>
            <div className="col-6">
              <div
                style={{
                  padding: "1rem 0",
                  textAlign: "left",
                  background: "",
                }}
              >
                <div class="skill">
                  <div class="skill-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns xlink="http://www.w3.org/1999/xlink" id="skill-code-icon">
                      <defs></defs>
                      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <path d="M21.963,8.904 C21.448,8.256 20.507,8.146 19.856,8.662 L0.643,23.901 C0.285,24.185 0.076,24.618 0.076,25.076 C0.076,25.534 0.285,25.967 0.643,26.251 L19.855,41.49 C20.131,41.709 20.46,41.815 20.787,41.815 C21.229,41.815 21.667,41.621 21.963,41.248 C22.479,40.599 22.369,39.655 21.721,39.141 L3.989,25.076 L21.72,11.012 C22.369,10.497 22.479,9.554 21.963,8.904 Z" id="code-left" fill="#4BC6B9"></path>
                        <path d="M75.357,23.901 L56.145,8.662 C55.494,8.146 54.551,8.256 54.038,8.904 C53.522,9.553 53.632,10.497 54.28,11.011 L72.011,25.075 L54.279,39.141 C53.631,39.656 53.521,40.599 54.037,41.248 C54.333,41.621 54.77,41.815 55.213,41.815 C55.539,41.815 55.868,41.709 56.145,41.49 L75.358,26.251 C75.716,25.967 75.925,25.534 75.925,25.076 C75.925,24.618 75.716,24.186 75.357,23.901 Z" id="code-right" fill="#4BC6B9"></path>
                        <path d="M47.013,0.308 C46.239,0.022 45.375,0.425 45.091,1.204 L28.091,47.923 C27.808,48.701 28.209,49.562 28.987,49.845 C29.156,49.908 29.329,49.936 29.5,49.936 C30.112,49.936 30.688,49.558 30.909,48.949 L47.909,2.23 C48.192,1.451 47.791,0.591 47.013,0.308 Z" id="Path" fill="#4BC6B9"></path>
                      </g>
                    </svg>
                  </div>
                  <h3>Front-End Developer</h3>
                  <p>I like to code my own designs. I apply my designs with modern HTML, CSS and basic Javascript.</p>
                </div>

              </div>
            </div>
          </div>






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
            2019 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Girls in Tech Hackathon - 1st Place<br />
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
