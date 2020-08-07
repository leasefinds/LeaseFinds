import React from "react"
import { graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import styles from "./PolicyTerms.module.scss"

export const fragment = graphql`
  fragment PolicyTerms on WPGraphQL_Page_Sectionfields_Sections_PolicyTerms {
    content
  }
`

const PolicyTerms = ({ content }) => {
  return (
    <section className={styles.Section}>
      <Container>
        <Row className={styles.Row}>
          <Col>
            <div
              className={styles.Content}
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default PolicyTerms
