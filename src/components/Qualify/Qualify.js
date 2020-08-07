import React from "react"
import { graphql, Link } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import Img from "gatsby-image"

import styles from "./Qualify.module.scss"

export const fragment = graphql`
  fragment Qualify on WPGraphQL_Page_Sectionfields_Sections_Qualify {
    content
    button {
      text
      url
      color
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

const Qualify = ({ content, image, button }) => {
  const img = image  ? image : null

  return (
    <section className={styles.Section}>
      <div className={styles.Overlay}></div>
      <div className={styles.Shape} data-negative="false">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <path
            d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
	c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
	c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
          ></path>
        </svg>
      </div>

      <Container>
        <Row className={styles.Row}>
          <Col md={6}>
            <div
              className={styles.Content}
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
            <Link
              className={`btn  ${
                button.color === "#ffffff" ? "btn-white" : "btn-blue"
              }`}
              to={button.url}
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
            </Link>
          </Col>

          <Col md={6}>
            {img.imageFile ? (
              <Img
                className={styles.Image}
                fluid={img.imageFile.childImageSharp.fluid}
                alt={img.altText}
              />
            ) : (
              <Img
                className={styles.Image}
                fluid={img.childImageSharp.fluid}
                alt=""
              />
            )}
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Qualify
