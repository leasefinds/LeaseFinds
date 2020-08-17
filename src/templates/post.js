import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import FluidImage from "../components/FluidImage"
import { Container, Row, Col } from "react-bootstrap"
import PostNavigationArrows from "../components/PostNavigationArrows/PostNavigationArrows"
import DateStyle from "../components/DateStyle"
import contentParser from "gatsby-wpgraphql-inline-images"
import Qualify from "../components/Qualify/Qualify"
import { graphql, useStaticQuery } from "gatsby"

import styles from "../styles/post.module.scss"

const Post = ({ pageContext }) => {
  const {
    post: { title, content, featuredImage, author, date },
    previous,
    next,
  } = pageContext

  const qContent = `
      <h2>Do You Want To Boost Your Business?</h2>
      <h3>Drop Us A Line And Keep In Touch</h3>
    `

  const qImage = useStaticQuery(graphql`
    query {
      img: file(relativePath: { eq: "CTA-post.png" }) {
        childImageSharp {
          fluid(maxWidth: 550) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const button = {
    text: `Contact Us`,
    url: "/contact-us/",
  }

  const pluginOptions = {
    wordPressUrl: `https://api.leasefinds.com/`,
    uploadsUrl: `https://api.leasefinds.com/uploads/`,
  }

  return (
    <Layout>
      <SEO
        article="true"
        wpseo={pageContext.post.seo}
        wpimage={pageContext.post.featuredImage.node}
        date={pageContext.post.date}
        modiefied={pageContext.post.modiefied}
        author={pageContext.post.author.node}
      />

      <article className={styles.Article}>
        <section className={styles.HeaderSection}>
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

          <Container className={styles.Container}>
            <Row className={styles.Row}>
              <Col>
                <h1
                  className={styles.Title}
                  dangerouslySetInnerHTML={{ __html: title }}
                ></h1>
                <div className={styles.EntryMeta}>
                  <div className={styles.EntryMeta__Author}>
                    <span>{author.node.firstName}</span>
                    {` `}
                    <span>{author.node.lastName}</span>
                  </div>
                  <div className={styles.Date}>
                    <DateStyle date={date} />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <Container className={styles.Container}>
          <Row style={{ paddingBottom: 40 }}>
            <Col md={12}>
              <FluidImage className={styles.Image} image={featuredImage.node} />
              <div className={styles.ContentWrapper}>
                {/* gatsby content with inline images */}
                <div className={`${styles.Content} wp-post-content`}>
                  {contentParser({ content }, pluginOptions)}
                </div>

                {/* blog pagination arrows */}
                <PostNavigationArrows next={next} previous={previous} />
              </div>
            </Col>
          </Row>
        </Container>
      </article>

      <Qualify content={qContent} image={qImage.img} button={button} />
    </Layout>
  )
}

export default Post
