import React from "react"
import { Link } from "gatsby"
import Resume from "../../content/assets/UX Lead & UX Manager_Annie Yining Wang.pdf"

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
                annie yining wang
              </Link>
            </ul>
          </nav>

          <div className="site-head-left">
            <div className="social-links">
              <li className="nav-about" role="menuitem">
              <Link
  to={`/about`}
  activeStyle={{ fontSize: 'larger' }}
  style={{ fontSize: 'larger' }}
>
  ABOUT
</Link>
              </li>
              <a
  href={Resume}
  aria-label="Resume"
  target="_blank"
  rel="noopener noreferrer"
  style={{ fontSize: 'larger' }}
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
          Home
        </a>{" "}
        &nbsp; · &nbsp;
        <a
          href="https://dribbble.com/annieuxjourney"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dribbble
        </a>
        &nbsp; · &nbsp;
        <a
          href="https://medium.com/@annieuxjourney"
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
          href="https://twitter.com/annieuxjourney"
          target="_blank"
          rel="noopener noreferrer"
        >
          X
        </a>
        <br/>
        &copy; {new Date().getFullYear()} All right reserved &mdash; Handcrafted with ❤{" "} by Annie using Gatsby x Netlify
      </footer>
    </div>
  )
}

export default Layout
