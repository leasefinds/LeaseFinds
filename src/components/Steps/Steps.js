import React from "react"
import { graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"

import styles from "./Steps.module.scss"

export const fragment = graphql`
  fragment Steps on WPGraphQL_Page_Sectionfields_Sections_Steps {
    content
    list {
      svg
      text
    }
  }
`

const Steps = ({ content, list }) => {
  return (
    <section className={styles.Section}>
      <div className={styles.Overlay}></div>

      <Container>
        <Row className={styles.Row}>
          <Col>
            <div
              className={styles.Content}
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </Col>
        </Row>

        <Row className={styles.Steps}>
          {list?.map((item, index) => (
            <Col key={index} md={4}>
              <div className={styles.Box}>
                <div dangerouslySetInnerHTML={{ __html: item.svg }}></div>

                <div
                  className={styles.Text}
                  dangerouslySetInnerHTML={{ __html: item.text }}
                ></div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Steps
