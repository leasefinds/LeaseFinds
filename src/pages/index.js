import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import HeroMain from "../components/HeroMain/HeroMain"
import TextImageLeft from "../components/TextImageLeft/TextImageLeft"
import Steps from "../components/Steps/Steps"
import Qualify from "../components/Qualify/Qualify"

const Home = ({ data, location }) => {
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
          case "WPGraphQL_Page_Sectionfields_Sections_HeroMain":
            return <HeroMain key={index} {...section} />

          case "WPGraphQL_Page_Sectionfields_Sections_TextImageLeft":
            return <TextImageLeft key={index} {...section} />

          case "WPGraphQL_Page_Sectionfields_Sections_Steps":
            return <Steps key={index} {...section} />

          case "WPGraphQL_Page_Sectionfields_Sections_Qualify":
            return <Qualify key={index} {...section} />

          default:
            return ""
        }
      })}
    </Layout>
  )
}

export default Home

export const homeQ = graphql`
  query {
    wpgraphql {
      page(id: "home", idType: URI) {
        id
        featuredImage {
          node {
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality: 100, maxWidth: 400) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
        title
        slug
        modified
        date
        seo {
          title
          metaDesc
        }
        sectionFields {
          sections {
            ...HeroMain
            ...TextImageLeft
            ...Steps
            ...Qualify
          }
        }
      }
    }
  }
`
