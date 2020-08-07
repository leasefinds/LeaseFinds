import React from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ wpimage, wpseo, article, date, modified, author }) => {
  // title desc from wordpress
  const { title, metaDesc } = wpseo
  const featuredImage = wpimage ? wpimage : false

  const { pathname } = useLocation()
  const { site } = useStaticQuery(query)
  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    siteLanguage,
    ogLanguage,
    siteName,
  } = site.siteMetadata

  const seo = {
    title: title || defaultTitle,
    description: metaDesc || defaultDescription,
    image: featuredImage
      ? `${siteUrl}${featuredImage.imageFile.childImageSharp.fluid.src}`
      : `${siteUrl}${defaultImage}`,
    url: `${siteUrl}${pathname}`,
  }

  const baseSchema = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: seo.url,
      name: seo.title,
    },
  ]

  const schema = article
    ? [
        ...baseSchema,
        {
          "@context": "http://schema.org",
          "@type": "NewsArticle",
          url: seo.url,
          name: seo.title,
          headline: seo.title,
          image: {
            "@type": "ImageObject",
            url: seo.image,
          },
          description: seo.description,
          datePublished: date,
          dateModified: modified,
          author: {
            "@type": "Person",
            name: author.firstName,
          },
          publisher: {
            "@type": "Organization",
            name: siteName,
            url: seo.url,
            logo: {
              "@type": "ImageObject",
              url: defaultImage,
            },
          },
        },
      ]
    : baseSchema

  return (
    <Helmet title={seo.title}>
      <html lang={siteLanguage} />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <link rel="canonical" href={seo.url} />

      {/* facebook meta */}
      {article ? (
        <meta property="og:type" content="article" />
      ) : (
        <meta property="og:type" content="website" />
      )}

      <meta property="og:locale" content={ogLanguage} />
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.url && <meta property="og:url" content={seo.url} />}
      <meta property="og:site_name" content={siteName} />
      {seo.image && <meta property="og:image" content={seo.image} />}

      {/* twitter meta */}
      <meta name="twitter:card" content="summary" />
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}

      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
export default SEO

SEO.defaultProps = {
  article: false,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl
        defaultImage: image
        siteLanguage
        ogLanguage
        siteName
      }
    }
  }
`
