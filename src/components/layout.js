import React from "react"
import { Link } from "gatsby"
import Resume from "../../content/assets/Resume.pdf"

const Layout = props => {
  const { title, children } = props
  const [toggleNav, setToggleNav] = React.useState(false)
  return (
    <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`}>
      <header className="site-head">
        <div className="site-head-container">
          <a
            className="nav-burger"
            href={`#`}
            onClick={() => setToggleNav(!toggleNav)}
          >
            <div
              className="hamburger hamburger--collapse"
              aria-label="Menu"
              role="button"
              aria-controls="navigation"
            >
              <div className="hamburger-box">
                <div className="hamburger-inner" />
              </div>
            </div>
          </a>
          <nav id="swup" class="site-head-left">
            <ul className="nav" role="menu">
              {/* <li className="nav-home nav-current" role="menuitem">
                <Link to={`/`}>Project</Link>
              </li> */}
              <li className="nav-contact" role="menuitem">
                <Link to={`/contact`}>CONTACT</Link>
              </li>
              <li className="nav-about" role="menuitem">
                <Link to={`/about`}>ABOUT</Link>
              </li>
              <li className="nav-project" role="menuitem">
                <Link to={`/project`}>PROJECT</Link>
              </li>

              <a
                href={Resume}
                aria-label="Resume"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                RESUME
              </a>

              {/* <li className="nav-elements" role="menuitem">
                <Link to={`/elements`}>Elements</Link>
              </li> */}
            </ul>
          </nav>
          {/* <div className="site-head-right"> 
                <Link className="site-head-logo" to={`/`}>
                  {title}
                </Link>
              </div>
          */}
          <div className="site-head-right">
            <div className="social-links">
              <Link className="site-head-logo" to={`/`}>
                yining wang
              </Link>
              {/*    <a
                href="https://www.facebook.com"
                title="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                title="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
               <Link 
                to={`/rss.xml`}
                title="RSS"
                target="_blank"
                rel="noopener noreferrer"
              >
                RSS
              </Link>
              */}
            </div>
          </div>
        </div>
      </header>
      <main id="site-main" className="site-main">
        <div id="swup" className="transition-fade">
          {children}
        </div>
      </main>
      <footer className="site-foot">
        &copy; {new Date().getFullYear()} &mdash; Handcrafted by Yining with ❤
        {/* {" "}
        <a
          href="https://gatsbyjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gatsby
        </a> */}
      </footer>
    </div>
  )
}

export default Layout
