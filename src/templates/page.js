import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import HeroMain from "../components/HeroMain/HeroMain"
import TextImageLeft from "../components/TextImageLeft/TextImageLeft"
import Steps from "../components/Steps/Steps"
import Qualify from "../components/Qualify/Qualify"
import InnerHero from "../components/InnerHero/InnerHero"
import ImageRightEqual from "../components/ImageRightEqual/ImageRightEqual"
import WeBelieve from "../components/WeBelieve/WeBelieve"
import Quiz from "../components/Quiz/Quiz"
import Contact from "../components/Contact/Contact"
import PolicyTerms from "../components/PolicyTerms/PolicyTerms"

const Page = ({ data, location }) => {
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

          case "WPGraphQL_Page_Sectionfields_Sections_InnerHero":
            return <InnerHero key={index} {...section} />

          case "WPGraphQL_Page_Sectionfields_Sections_ImageRightEqual":
            return (
              <ImageRightEqual location={location} key={index} {...section} />
            )

          case "WPGraphQL_Page_Sectionfields_Sections_WeBelieve":
            return <WeBelieve key={index} {...section} />

          case "WPGraphQL_Page_Sectionfields_Sections_Quiz":
            return <Quiz key={index} {...section} />

          case "WPGraphQL_Page_Sectionfields_Sections_Contact":
            return <Contact key={index} {...section} />

          case "WPGraphQL_Page_Sectionfields_Sections_PolicyTerms":
            return <PolicyTerms key={index} {...section} />

          default:
            return ""
        }
      })}
    </Layout>
  )
}

export default Page

export const pageQ = graphql`
  query($id: ID!) {
    wpgraphql {
      page(id: $id, idType: ID) {
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
            ...InnerHero
            ...ImageRightEqual
            ...WeBelieve
            ...Quiz
            ...Contact
            ...PolicyTerms
          }
        }
      }
    }
  }
`
