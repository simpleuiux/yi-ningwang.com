import React from "react"
import { Link } from "gatsby"
import Resume from "../../content/assets/UX Professional_Annie Yining Wang.pdf"

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
    <nav id="swup" className="site-head-right">
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
      <ul className="nav" role="menu">
        <li className="nav-about" role="menuitem">
          <Link to={`/about`} activeStyle={activeStyle}>
            ABOUT
          </Link>
        </li>
        <li className="nav-resume" role="menuitem">
          <a
            href={Resume}
            aria-label="Resume"
            target="_blank"
            rel="noopener noreferrer"
          >
            RESUME
          </a>
        </li>
      </ul>
    </nav>

    <div className="site-head-left">
      <div className="social-links">
        {/* Other social links or elements */}
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
          Annie Yining Wang
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
        &nbsp; &nbsp; &copy; {new Date().getFullYear()} All right reserved &mdash; Handcrafted with ❤{" "} by Annie using Gatsby x Netlify
      </footer>
    </div>
  )
}

export default Layout
