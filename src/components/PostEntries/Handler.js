import React, { Component } from "react"
import PostEntry from "../PostEntry/PostEntry"
import { Col } from "react-bootstrap"

import styles from "./PostEntries.module.scss"

const itemsPerShow = 6

class PostsHandler extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemsToShow: itemsPerShow,
      showMoreItems: true,
    }

    this.showMore = this.showMore.bind(this)
  }

  showMore() {
    this.props.posts.length > this.state.itemsToShow
      ? this.setState({ itemsToShow: this.state.itemsToShow + itemsPerShow })
      : this.setState({ showMoreItems: false })
  }

  render() {
    return (
      <>
        {this.props.posts
          .slice(0, this.state.itemsToShow)
          .map((post, index) => (
            <Col className={styles.PostEntryWrapper} key={index} md={6} lg={4}>
              <PostEntry post={post} />

              {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
            </Col>
          ))}
        {this.props.posts.length > this.state.itemsToShow &&
        this.state.showMoreItems ? (
          <Col className="d-flex">
            <button className={styles.LoadMore} onClick={this.showMore}>
              Load more
            </button>
          </Col>
        ) : null}
      </>
    )
  }
}

export default PostsHandler
