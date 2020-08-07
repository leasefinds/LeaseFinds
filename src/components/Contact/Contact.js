import React from "react"
import { graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import styles from "./Contact.module.scss"
import Form from "../Form/Form"
export const fragment = graphql`
  fragment Contact on WPGraphQL_Page_Sectionfields_Sections_Contact {
    content
  }
`

const Contact = ({ content }) => {
  return (
    <section className={styles.Section}>
      <Container>
        <Row className={styles.Row}>
          <Col md={6}>
            <Form />
          </Col>
          <Col md={6}>
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

export default Contact
