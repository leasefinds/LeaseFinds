import React from "react"
import { Container } from "react-bootstrap"
import { useStaticQuery, graphql, Link } from "gatsby"
import useResizer from "../resizer"
import { RemoveScroll } from "react-remove-scroll"

import Img from "gatsby-image"

import styles from "./Header.module.scss"

const Header = ({ location }) => {
  const data = useStaticQuery(graphql`
    query headerQuery {
      wpgraphql {
        menu(id: "top-menu", idType: NAME) {
          menuItems {
            edges {
              node {
                id
                label
                url
              }
            }
          }
        }
        page(id: "global-information", idType: URI) {
          id
          globalFields {
            logoWhite {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100, maxWidth: 150) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const logo = data.wpgraphql.page.globalFields.logoWhite

  const menu = data.wpgraphql.menu.menuItems.edges

  // let isMobile = true
  const isMobile = useResizer() //returns Boolean based on window width-> resizer.js


  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <header id="header">
      <div className={styles.Wrapper}>
        <Container>
          <div className={styles.InnerWrapper}>
            <div className={styles.Logo}>
              <Link aria-label="Header logo" to="/">
                <Img
                  className={styles.Logo}
                  fluid={logo.imageFile.childImageSharp.fluid}
                  alt={logo.altText}
                  loading="eager"
                  imgStyle={{ objectFit: "contain" }}
                />
              </Link>
            </div>
            <div>
              {isMobile ? (
                <div>
                  <button
                    aria-label="Menu Toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`${styles.NavbarToggler} ${
                      isMenuOpen ? styles.Open : null
                    }`}
                  >
                    <div />
                    <div />
                    <div />
                  </button>

                  <RemoveScroll enabled={isMenuOpen}>
                    <div
                      className={`${
                        isMenuOpen ? styles.Open : styles.Closed
                      }   ${styles.MenuWrapperMobile}`}
                    >
                      <nav>
                        <ul>
                          {menu.map(({ node }, index) => {
                            return (
                              <li
                                key={index}
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <Link
                                  className={
                                    location
                                      ? (location.pathname.includes(node.url) &&
                                          node.url !== "/") ||
                                        location.pathname === node.url
                                        ? styles.ActiveMenuItem
                                        : ""
                                      : ""
                                  }
                                  to={node.url}
                                >
                                  {node.label}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </nav>
                    </div>
                  </RemoveScroll>
                </div>
              ) : null}
            </div>

            <div>
              {!isMobile ? (
                <nav>
                  <ul>
                    {menu.map(({ node }, index) => {
                      return (
                        <li key={index}>
                          <Link
                            className={
                              location
                                ? (location.pathname.includes(node.url) &&
                                    node.url !== "/") ||
                                  location.pathname === node.url
                                  ? styles.ActiveMenuItem
                                  : ""
                                : ""
                            }
                            to={node.url}
                          >
                            {node.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>

                  <div className={styles.Phone}>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="phone-alt"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#ffffff"
                        d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"
                      ></path>
                    </svg>
                    <span>XXX-XXX-XXXX</span>
                  </div>
                </nav>
              ) : null}
            </div>

          </div>
        </Container>
      </div>
    </header>
  )
}

export default Header
