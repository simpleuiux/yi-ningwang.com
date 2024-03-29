import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"
import Particles from "react-particles-js"

const AboutPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <SEO title="ABOUT" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />

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
              value: "#eeeeee",
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

      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h1 id="about-me-titles">
            <br />Passionate about design, psychology, and {""}
            <a href="https://github.com/simpleuiux" target="_blank">
            bringing{""}
            </a>{" "} ideas to life.
          </h1>
          <br />
          <br />
          <br />
          <br />
          <br />
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
                  <div class="skill-icon"></div>
                  <img src={"../../yining.png"} alt="yining picture" />
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
                  <h6>
                  As a Lead UX and UX Manager in Canada with nearly 9 years of experience, 
                  I embrace servant leadership, fostering innovation, and teamwork. 
                  I lead by example, value every team member's input, and focus on applying new ideas through research, 
                  effective design processes, and user feedback for outstanding results.
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
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
                    <svg
                      width="60px"
                      height="50px"
                      viewBox="0 0 60 60"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xlink="http://www.w3.org/1999/xlink"
                      id="skill-ui-icon"
                    >
                      <defs></defs>
                      <g
                        id="Page-1"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g id="light-bulb" fill-rule="nonzero" fill="#F0BF60">
                          <path
                            d="M30,9.95510204 C20.9142857,9.95510204 14.3510204,16.7265306 13.3102041,24 C12.6612245,28.8489796 14.2285714,33.5755102 17.4857143,37.1510204 C20.3510204,40.2122449 21.9183673,44.3020408 21.9183673,48.5142857 L21.9061224,55.1510204 C21.9061224,57.8326531 24.122449,60 26.8653061,60 L33.2571429,60 C36,60 38.2163265,57.8326531 38.2163265,55.1510204 L38.2285714,48.5142857 C38.2285714,44.1795918 39.6612245,40.2122449 42.4040816,37.4081633 C45.4040816,34.3469388 46.9714286,30.3918367 46.9714286,26.3020408 C46.9591837,17.2285714 39.2571429,9.95510204 30,9.95510204 L30,9.95510204 Z M35.7306122,55.1510204 C35.7306122,56.4244898 34.6897959,57.4530612 33.3795918,57.4530612 L26.9877551,57.4530612 C25.677551,57.4530612 24.6367347,56.4367347 24.6367347,55.1510204 L24.6367347,52.2122449 L35.7183673,52.2122449 L35.7183673,55.1510204 L35.7306122,55.1510204 Z M40.5795918,35.6204082 C37.322449,38.9387755 35.6204082,43.5306122 35.6204082,48.5142857 L35.6204082,49.6653061 L24.5387755,49.6653061 L24.5387755,48.5142857 C24.5387755,43.7877551 22.5795918,39.0734694 19.322449,35.4979592 C16.4571429,32.4367347 15.2816327,28.4816327 15.7959184,24.3918367 C16.7142857,18.2693878 22.4081633,12.5142857 30.0122449,12.5142857 C37.9714286,12.5142857 44.3632653,18.7714286 44.3632653,26.3020408 C44.3632653,29.7428571 43.0530612,33.0612245 40.5795918,35.6204082 Z"
                            id="Shape"
                          ></path>
                          <rect
                            class="bulb-ray"
                            id="bulb-ray1"
                            x="0"
                            y="27.5755102"
                            width="6.39183673"
                            height="2.55918367"
                            fill="#F0BF60"
                          ></rect>
                          <polygon
                            class="bulb-ray"
                            id="bulb-ray2"
                            points="9.68571429 7.49387755 7.84897959 9.31836735 12.3183673 13.6163265 14.1428571 11.7918367"
                            fill="#F0BF60"
                          ></polygon>
                          <rect
                            class="bulb-ray"
                            id="bulb-ray3"
                            x="28.6897959"
                            y="0"
                            width="2.60816327"
                            height="6.12244898"
                            fill="#F0BF60"
                          ></rect>
                          <polygon
                            class="bulb-ray"
                            id="bulb-ray4"
                            points="45.8081633 11.8040816 47.6326531 13.6285714 52.1020408 9.33061224 50.2653061 7.50612245"
                            fill="#F0BF60"
                          ></polygon>
                          <rect
                            class="bulb-ray"
                            id="bulb-ray5"
                            x="53.6081633"
                            y="27.5755102"
                            width="6.39183673"
                            height="2.55918367"
                            fill="#F0BF60"
                          ></rect>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h3>UX Generalist</h3>
                  <p>
                    With extensive UX experience, I currently serve as the {""}
            <a href="https://www.linkedin.com/in/annieyiningwang/" target="_blank">
            Lead UX | UX Manager {""}
            </a>{" "}  at Zoocasa x eXp Realty.
                  </p>
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
                    <svg
                      width="60px"
                      height="50px"
                      viewBox="0 0 76 50"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xlink="http://www.w3.org/1999/xlink"
                      id="skill-code-icon"
                    >
                      <defs></defs>
                      <g
                        id="Page-1"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <path
                          d="M21.963,8.904 C21.448,8.256 20.507,8.146 19.856,8.662 L0.643,23.901 C0.285,24.185 0.076,24.618 0.076,25.076 C0.076,25.534 0.285,25.967 0.643,26.251 L19.855,41.49 C20.131,41.709 20.46,41.815 20.787,41.815 C21.229,41.815 21.667,41.621 21.963,41.248 C22.479,40.599 22.369,39.655 21.721,39.141 L3.989,25.076 L21.72,11.012 C22.369,10.497 22.479,9.554 21.963,8.904 Z"
                          id="code-left"
                          fill="#31ABF4"
                        ></path>
                        <path
                          d="M75.357,23.901 L56.145,8.662 C55.494,8.146 54.551,8.256 54.038,8.904 C53.522,9.553 53.632,10.497 54.28,11.011 L72.011,25.075 L54.279,39.141 C53.631,39.656 53.521,40.599 54.037,41.248 C54.333,41.621 54.77,41.815 55.213,41.815 C55.539,41.815 55.868,41.709 56.145,41.49 L75.358,26.251 C75.716,25.967 75.925,25.534 75.925,25.076 C75.925,24.618 75.716,24.186 75.357,23.901 Z"
                          id="code-right"
                          fill="#31ABF4"
                        ></path>
                        <path
                          d="M47.013,0.308 C46.239,0.022 45.375,0.425 45.091,1.204 L28.091,47.923 C27.808,48.701 28.209,49.562 28.987,49.845 C29.156,49.908 29.329,49.936 29.5,49.936 C30.112,49.936 30.688,49.558 30.909,48.949 L47.909,2.23 C48.192,1.451 47.791,0.591 47.013,0.308 Z"
                          id="Path"
                          fill="#31ABF4"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <h3>Creative Technologist</h3>
                  <p>
                  I am enthusiastic about {""}
            <a href="https://twitter.com/annieuxjourney" target="_blank">
            sharing new technologies {""}
            </a>{" "} and integrating innovative UX solutions using AI.
                 </p>
                </div>
              </div>
            </div>
          </div>
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
                    <svg
                      width="60px"
                      height="50px"
                      viewBox="0 0 52 48"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                  
                      xlink="http://www.w3.org/1999/xlink"
                      id="skill-teacher-icon"
                    >
                      <g
                        id="Page-1"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <path
                          d="M24.7834651,41.4747332 L16.5013958,46.2431974 C16.0621951,46.4941692 15.8739663,47.0588558 16.1249381,47.4980564 C16.3131669,47.8117712 16.6268817,48 16.9405964,48 C17.1288253,48 17.2543112,47.9372571 17.3797971,47.8745141 L25.4736376,43.2315358 C25.5363805,43.2315358 25.5991235,43.2942788 25.7246094,43.2942788 C25.8500953,43.2942788 25.9128382,43.2942788 25.9755812,43.2315358 L34.0694217,47.8745141 C34.1949076,47.9372571 34.3831364,48 34.5086223,48 C34.8223371,48 35.1360518,47.8117712 35.3242807,47.4980564 C35.5752525,47.0588558 35.4497666,46.4941692 34.947823,46.2431974 L26.6657536,41.4747332 L26.6657536,37.3336986 L47.9983565,37.3336986 C49.880645,37.3336986 51.4492188,35.7651248 51.4492188,33.8828363 L51.4492188,3.76622046 C51.4492188,1.88393197 49.880645,0.315358232 47.9983565,0.315358232 L3.45086223,0.315358232 C1.56857374,0.315358232 0,1.88393197 0,3.76622046 L0,33.8828363 C0,35.7651248 1.56857374,37.3336986 3.45086223,37.3336986 L24.7834651,37.3336986 L24.7834651,41.4747332 Z M1.88228849,33.8828363 L1.88228849,3.76622046 C1.88228849,2.88781917 2.57246094,2.19764672 3.45086223,2.19764672 L47.9983565,2.19764672 C48.8767578,2.19764672 49.5669303,2.88781917 49.5669303,3.76622046 L49.5669303,33.8828363 C49.5669303,34.7612376 48.8767578,35.4514101 47.9983565,35.4514101 L3.45086223,35.4514101 C2.57246094,35.4514101 1.88228849,34.7612376 1.88228849,33.8828363 Z"
                          id="Shape"
                          fill="#449DD1"
                          fill-rule="nonzero"
                        ></path>
                        <path
                          d="M10.2898437,13.1776629 L23.5913491,13.1776629 C24.0932927,13.1776629 24.5324933,12.7384623 24.5324933,12.2365187 C24.5324933,11.7345751 24.0932927,11.2953744 23.5913491,11.2953744 L10.2898437,11.2953744 C9.78790015,11.2953744 9.3486995,11.7345751 9.3486995,12.2365187 C9.3486995,12.7384623 9.7251572,13.1776629 10.2898437,13.1776629 Z"
                          id="board-line1"
                          fill="#449DD1"
                          fill-rule="nonzero"
                        ></path>
                        <path
                          d="M41.159375,17.5696694 L10.2898437,17.5696694 C9.78790015,17.5696694 9.3486995,18.00887 9.3486995,18.5108136 C9.3486995,19.0127572 9.78790015,19.4519579 10.2898437,19.4519579 L41.159375,19.4519579 C41.6613186,19.4519579 42.1005192,19.0127572 42.1005192,18.5108136 C42.1005192,18.00887 41.7240615,17.5696694 41.159375,17.5696694 Z"
                          id="board-line2"
                          fill="#449DD1"
                          fill-rule="nonzero"
                        ></path>
                        <path
                          d="M41.159375,23.8439644 L10.2898437,23.8439644 C9.78790015,23.8439644 9.3486995,24.283165 9.3486995,24.7851086 C9.3486995,25.2870522 9.78790015,25.7262529 10.2898437,25.7262529 L41.159375,25.7262529 C41.6613186,25.7262529 42.1005192,25.2870522 42.1005192,24.7851086 C42.1005192,24.283165 41.7240615,23.8439644 41.159375,23.8439644 Z"
                          id="board-line3"
                          fill="#449DD1"
                          fill-rule="nonzero"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <h3>Avid Reader</h3>
                  <p>
                    Current read on {""}
                    <a href="https://www.goodreads.com/user/show/3607330-yining-wang" target="_blank">
                      goodreads
                    </a>
                    {""}
                     - 'No Rules Rules: Netflix and the Culture of
                    Reinvention' by Reed Hastings, Erin Meyer.
                  </p>
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
                    <svg
                      width="60px"
                      height="50px"
                      viewBox="0 0 49 40"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                  
                      xlink="http://www.w3.org/1999/xlink"
                      id="skill-speaker-icon"
                    >
                      <defs></defs>
                      <g
                        id="Page-1"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          id="noun_690159_cc"
                          transform="translate(-1.000000, -7.000000)"
                          fill-rule="nonzero"
                          fill="#F5AF6F"
                        >
                          <path
                            d="M33.7902356,24.5853294 C34.0498931,24.8439244 34.0498931,25.2615651 33.7902356,25.5201601 L14.8177066,43.3615031 C13.1054685,44.9955394 10.4438264,45.1449045 8.5560354,43.7128933 C7.61176198,44.7405441 5.52230592,47.4986261 7.27021628,50.163888 C7.4006129,50.3628565 7.41388371,50.6155811 7.30502973,50.8268629 C7.19617574,51.0381447 6.98173447,51.1758849 6.74248387,51.1881982 C6.50323326,51.2005114 6.27552117,51.0855271 6.14512455,50.8865586 C4.13603218,47.7969763 6.01118506,44.4620839 7.59836803,42.7714327 C6.14477628,40.9075198 6.28126139,38.2726747 7.91982281,36.5657481 L26.0016542,17.8028345 C26.1667435,17.6311057 26.4118339,17.5596152 26.6446022,17.6152926 C26.8773706,17.67097 27.0624538,17.8453567 27.1301329,18.0727629 C27.197812,18.3001691 27.1378048,18.5460464 26.9727155,18.7177751 L8.924369,37.4806888 C7.6335191,38.8521506 7.67160807,40.9893325 9.01052384,42.3148591 C10.3494396,43.6403857 12.5082092,43.6780938 13.8935241,42.4001524 L32.8459622,24.5654394 C33.1126615,24.3137977 33.5345891,24.3226851 33.7902356,24.5853294 Z M36.7168135,24.9566097 C36.5308903,24.9613118 36.3513654,24.8892592 36.2212374,24.7577095 L26.7316244,15.3696227 C26.6062661,15.244502 26.536383,15.0751199 26.5374121,14.8988924 C26.5481788,11.3221968 28.4855462,8.02288026 31.6197268,6.24376344 C34.7539074,4.46464663 38.6087445,4.47601967 41.7321584,6.27359846 C44.8555723,8.07117725 46.773042,11.3818668 46.7622753,14.9585624 C46.7660236,20.4611828 42.2749572,24.9310513 36.7168135,24.9566097 Z M41.0028772,22.4836179 L29.0420806,10.6424293 C28.3360019,11.8555163 27.9405382,13.2212457 27.890201,14.6204322 L36.9579046,23.6173487 C38.3799552,23.574938 39.7694165,23.1854977 41.0028772,22.4836179 Z M39.9970598,6.94264312 C36.7164516,5.60403179 32.9442806,6.35530487 30.4417483,8.84569796 C30.2055626,9.06984919 29.9819933,9.30667618 29.7720508,9.55510848 L42.0944841,21.7543174 C42.3454437,21.5464943 42.5846639,21.3251597 42.8110603,21.0913169 C44.4759625,19.475721 45.416801,17.2665599 45.4228804,14.9585624 C45.4196309,11.4457162 43.2776679,8.28125444 39.9970598,6.94264312 Z"
                            id="Shape"
                            transform="translate(26.017261, 28.053236) rotate(13.000000) translate(-26.017261, -28.053236) "
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h3>Mentorship</h3>
                  <p>
                    I provide {""}
                    <a href="https://adplist.org/mentors/annie-yining-wang" target="_blank">
                      mentorship
                    </a>
                    {""} and deliver speeches to UX designers and
                    design students during workshops, hackathons, and university settings.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <h5 id="dynamic-styles">Leading with Empathy: Shaping the Future of User-Centric Digital Innovation</h5>
          <p>
            In crafting digital products, my diverse background in <b>design, communication, 
            and strategy</b> guides me to not only make products that are sensible but also communidate effectively. 
            With a <b>servant leadership approach</b>, I prioritize empathy and collaboration, 
            ensuring our team's collective wisdom shapes each product. 
            This approach not only meets user needs but also <b>drives business success</b> through <b>satisfied users</b>.
          </p>
          <br />
          <br />
          <h5 id="dynamic-styles">Recognition</h5>
          2023 &nbsp;  {" "}
          <a href="https://medium.com/@annieuxjourney" target="_blank"> 
          UX Writer </a>{" "}
          {" "}
          <a href="https://uxdesign.cc/" target="_blank">
          @UX Collective</a>{" "} 
          <br/>
          2022 &nbsp;
          {" "}
          <a href="https://www.linkedin.com/posts/annieyiningwang_mentorship-mentoring-leadership-activity-6937447528208482304-UOOP?utm_source=share&utm_medium=member_desktop" target="_blank">
          ADPList Top 1% Mentor Worldwide
          </a>{" "}
          <br/>
          2021 &nbsp;  {" "}
          <a href="https://medium.com/@annieuxjourney" target="_blank"> 
          UX Writer </a>{" "} 
          {" "}
          <a href="https://uxplanet.org/" target="_blank">
          @UX Planet</a>{" "} 
          <br />
          2020 &nbsp;  {" "}
          <a href="https://medium.com/@annieuxjourney" target="_blank"> 
          UX Writer </a>{" "} 
          {" "}
          <a href="https://uxplanet.org/" target="_blank">
          @UX Planet</a>{" "} 
          <br />
          2019 &nbsp; Girls in Tech Hackathon -{" "}
          <a href="https://devpost.com/software/girls_in_tech_vancouver#updates" target="_blank">
            1st Place.
          </a>{" "}
          <br />
          <br />
          <h5 id="dynamic-styles">Experience</h5>
          <p>
            
I began my professional journey as an international journalist and research strategist, traversing over 40 countries and collaborating with individuals from North America, Africa, Europe, and Asia.
          </p>
          <p>
          After graduating from MBA program in 2015, I transitioned to the UX domain while working with UBS, a Swiss bank. Since then, my growth as a UX professional has been continuous. I've contributed systematic and precise research and designs across diverse industries, including <b>Consultancy</b>, <b>Financial Services</b>,{" "}
            <b>Healthcare</b>, <b>Construction</b>, to <b>Real Estate</b>, spanning both B2B and B2C domains.
          </p>
          <p>
          Additionally, I hold the role of Co-founder at   -{" "}
            <a href="https://sassy.technology">Sassy Technology</a>, a tech design studio based in Canada and Japan. Engaging with this venture adds a personal fulfillment dimension to my professional journey.​
          </p>
          <p>
            <br />
            <h5 id="dynamic-styles">Educational background</h5>
            2014 - 2016
            <br/> 
            Babson Colleage (Entrepreneurial Thought & Action) 
            <br/>
            (#1 for Best MBA in Entrepreneurship - Worldwide)
            <br/>
            <br/>
            National Chiao Tung University - Global MBA
            <br/> 
            (Top 100 in Entrepreneurship - Worldwide)
            <br />
            <br />
            2006 - 2010 
            <br/>
            National Chengchi University - Media and Communication 
            <br/> 
            (#1 Best in Communication and Digital Media - Nationwide)
            <br />
            <br />
            <h5 id="dynamic-styles">Design workshop</h5>
            2021 &nbsp; ComIT - How to work with UX designer
            <br/>
            2020 &nbsp; UBC Sustainability Hacks - Design Mentor
            <br />
            2020 &nbsp; International Design Foundation
            <br />
            2017 &nbsp; World's Top 50 Thinkers workshop - Hermann Simon
            (Branding)
            <br />
            2016 &nbsp; World's Top 50 Thinkers workshop - Alex
            Osterwalder (UX)
            <br />
          </p>
        </div>
      </article>

      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h1 id="want-to-chat-hit-me-up-on-linkedin-messenger-or-drop-me-an-email">
            Want to chat? Hit me up on{" "}
            <a
              href="https://www.linkedin.com/in/annieyiningwang/"
              target="_blank"
            >
              Linkedin,
            </a>{" "}
            <a href="https://m.me/annieynwang" target="_blank">
              Messenger
            </a>{" "}
            or drop me an{" "}
            <a href="mailto:annieynwang@gmail.com" target="_blank">
              Email.
            </a>{" "}
          </h1>
        </div>
        <br />
        <br />
      </article>
    </Layout>
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
