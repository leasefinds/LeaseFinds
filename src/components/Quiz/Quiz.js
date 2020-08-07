import React from "react"
import { graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import styles from "./Quiz.module.scss"
import useScript from "../hooks/useScript"

export const fragment = graphql`
  fragment Quiz on WPGraphQL_Page_Sectionfields_Sections_Quiz {
    frameData
  }
`

const Quiz = ({ frameData }) => {
  return (
    <section className={styles.Section}>
      <Container>
        <Row className={styles.Row}>
          <Col>

            {frameData ? (
              <div
                className="quiz-container"
                style={{ textAlign: "center" }}
                data-quiz={frameData}
                data-offset="0"
              ></div>
            ) : null}
            {useScript("https://2marketing.leadshook.io/s/js_embed")}
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Quiz
