import React from "react"
import { Container, Row } from "react-bootstrap"

import Handler from "./Handler"

import styles from "./PostEntries.module.scss"

const PostEntries = ({ nodes }) => {
  return (
    <section className={styles.Section}>
      <Container>
        <Row>
          <Handler posts={nodes} />
        </Row>
      </Container>
    </section>
  )
}

export default PostEntries
