import React from "react"
import { Link } from "gatsby"
import Resume from "../../content/assets/Resume - Yining Wang - Senior UX Designer - Dec 2020.pdf"

const activeStyle = {
  color: "rgb(38, 168, 237)",
  fontWeight: 700,
}

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
          <nav id="swup" class="site-head-right">
            <ul className="nav" role="menu">
              {/* <li className="nav-home nav-current" role="menuitem">
                <Link to={`/`}>Project</Link>
              </li> */}

              <Link
                className="site-head-logo"
                to={`/`}
                activeStyle={activeStyle}
              >
                yining wang
              </Link>
            </ul>
          </nav>

          <div className="site-head-left">
            <div className="social-links">
              <li className="nav-about" role="menuitem">
                <Link to={`/about`} activeStyle={activeStyle}>
                  ABOUT
                </Link>
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
              {/* <li className="nav-project" role="menuitem">
                <Link to={`/project`} activeStyle={activeStyle}>
                  PROJECTS
                </Link>
              </li> */}
              {/* <li className="nav-contact" role="menuitem">
                <Link to={`/contact`} activeStyle={activeStyle}>
                  CONTACT
                </Link>
              </li> */}

              {/* <li className="nav-elements" role="menuitem">
                <Link to={`/elements`}>Elements</Link>
              </li> */}

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
        <a href="/" rel="noopener noreferrer">
          Yining Wang
        </a>{" "}
        &nbsp; · &nbsp;
        <a
          href="https://dribbble.com/simpleuiux"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dribbble
        </a>
        &nbsp; · &nbsp;
        <a
          href="https://medium.com/@simpleuiux"
          target="_blank"
          rel="noopener noreferrer"
        >
          Medium
        </a>
        &nbsp; · &nbsp;
        <a
          href="https://www.linkedin.com/in/annieyiningwang/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Linkedin
        </a>
        &nbsp; · &nbsp;
        <a
          href="mailto:simpleuiux@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Email
        </a>
        &nbsp; · &nbsp;
        <a
          href="https://m.me/annieynwang"
          target="_blank"
          rel="noopener noreferrer"
        >
          Messenger
        </a>
        &nbsp; · &nbsp; &copy; {new Date().getFullYear()} &mdash; Handcrafted by
        Yining with ❤{" "}
      </footer>
    </div>
  )
}

export default Layout
