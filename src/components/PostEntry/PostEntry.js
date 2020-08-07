import React from "react"
import { Link } from "gatsby"
import FluidImage from "../FluidImage"
import styles from "./PostEntry.module.scss"
import DateStyle from "../DateStyle"

const PostEntry = ({ post }) => {
  const { uri, title, featuredImage, excerpt, author, date } = post


  return (
    <div className={styles.Wrapper}>
      <article>
        <div className={styles.InnerWrapper} style={{ transition: ".3s" }}>
          <div className={styles.Inner}>
            <Link to={`${uri}`}>
              <FluidImage
                withFallback="true"
                className={styles.Image}
                image={featuredImage.node}
                style={{ margin: 0 }}
              />
            </Link>

            <div className={styles.Content}>
              <div className={styles.ContentInner}>
                <Link to={`${uri}`}>
                  <h3 dangerouslySetInnerHTML={{ __html: title }}></h3>
                </Link>

                <div dangerouslySetInnerHTML={{ __html: excerpt }} />
              </div>
            </div>
          </div>
          <div className={styles.EntryFooter}>
            <div className={styles.Author}>
              <span>{author.node.firstName}</span>
              {` `}
              <span>{author.node.lastName}</span>
            </div>
            <div className={styles.Date}>
              <DateStyle date={date} />
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default PostEntry
