import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

import SEO from "../components/seo"

import Qualify from "../components/Qualify/Qualify"
import InnerHero from "../components/InnerHero/InnerHero"
import PostEntries from "../components/PostEntries/PostEntries"

const Blog = ({ data, pageContext, location }) => {
  const { nodes } = pageContext

  const sections = data.wpgraphql.page.sectionFields.sections

  return (
    <Layout location={location}>
      <SEO
        wpseo={data.wpgraphql.page.seo}
        wpimage={
          data.wpgraphql.page.featuredImage
            ? data.wpgraphql.page.featuredImage.node
            : null
        }
      />

      {sections.map((section, index) => {
        const typeName = section.__typename

        switch (typeName) {
          case "WPGraphQL_Page_Sectionfields_Sections_InnerHero":
            return <InnerHero key={index} {...section} />

          case "WPGraphQL_Page_Sectionfields_Sections_PostEntries":
            return <PostEntries nodes={nodes} key={index} {...section} />

          case "WPGraphQL_Page_Sectionfields_Sections_Qualify":
            return <Qualify key={index} {...section} />

          default:
            return ""
        }
      })}
    </Layout>
  )
}

export default Blog

export const query = graphql`
  {
    wpgraphql {
      page(id: "blog", idType: URI) {
        id
        featuredImage {
          node {
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(
                  maxHeight: 500
                  maxWidth: 800
                  quality: 90
                  cropFocus: CENTER
                ) {
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
        }
        title
        slug
        seo {
          title
          metaDesc
        }
        sectionFields {
          sections {
            ...InnerHero
            ...Qualify
          }
        }
      }
    }
  }
`
