import React from 'react'
import { Container } from 'react-responsive-grid'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Headroom from 'react-headroom'
import '../css/markdown-styles'

import { rhythm } from '../utils/typography'

module.exports = React.createClass({
  propTypes () {
    return {
      children: React.PropTypes.any,
    }
  },
  render () {
    // Determine if it's the homepage
    if (this.props.location.pathname === '/') {
      return (
        <div>
          {this.props.children}
          <footer className="siteFooter">
            <div className="footerContainer">
              <p>Copyright Apollo27 Ltd &copy; 2017. All rights reserved unless otherwise specified. Powered by <a href="https://github.com/gatsbyjs/gatsby">GatsbyJS</a>.</p>
              <p>Privacy Policy | Contact</p>
            </div>
          </footer>
        </div>
      );
    }
    return (
      <div>
        <Headroom
          wrapperStyle={{
            marginBottom: rhythm(1),
          }}
          style={{
            background: 'lightgray',
          }}
        >
          <Container
            style={{
              maxWidth: 960,
              paddingTop: 0,
              padding: `${rhythm(1)} ${rhythm(3/4)}`,
            }}
          >
            <Link
              to={prefixLink('/')}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
            >
              Gatsby!!!
            </Link>
          </Container>
        </Headroom>

        <Container
          style={{
            maxWidth: 960,
            padding: `${rhythm(1)} ${rhythm(3/4)}`,
            paddingTop: 0,
          }}
        >

          {this.props.children}
        </Container>
      </div>
    )
  },
})
