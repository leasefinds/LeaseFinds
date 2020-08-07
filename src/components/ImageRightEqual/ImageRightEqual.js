import React from "react"
import { graphql, Link } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import Img from "gatsby-image"
import { AnchorLink } from "gatsby-plugin-anchor-links"

import styles from "./ImageRightEqual.module.scss"

export const fragment = graphql`
  fragment ImageRightEqual on WPGraphQL_Page_Sectionfields_Sections_ImageRightEqual {
    content
    button {
      text
      url
    }
    image {
      sourceUrl
      altText
      imageFile {
        childImageSharp {
          fluid(quality: 100, maxWidth: 580) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`

const ImageRightEqual = ({ location, content, image, button }) => {
  const img = image ? image : null

  return (
    <section className={styles.Section}>
      <div className={styles.Overlay}></div>

      <Container>
        <Row className={styles.Row}>
          <Col md={6}>
            <div
              className={styles.Content}
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>

            <AnchorLink
              className="btn btn-blue"
              to={`${location.pathname}${button.url}`}
            >
              {button.text}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 448 512"
              >
                <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
              </svg>
            </AnchorLink>
          </Col>

          <Col md={6}>
            <Img
              className={styles.Image}
              fluid={img.imageFile.childImageSharp.fluid}
              alt={img.altText}
            />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ImageRightEqual
