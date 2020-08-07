const PostTemplateFragment = `
    fragment PostTemplateFragment on WPGraphQL_Post {
        id
        postId
        title
        content
        link
        date
        modified
        seo {
            title
            metaDesc
        }
        featuredImage {
            node {
                sourceUrl
                altText
                imageFile {
                    childImageSharp {
                        fluid(maxHeight: 500, maxWidth: 800, quality: 90, cropFocus: CENTER) {
                            ...GatsbyImageSharpFluid_tracedSVG
                        }
                    }
                }
            }
        }
        categories {
            nodes {
                name
                slug
                id
            }
        }
        tags {
            nodes {
                slug
                name
                id
            }
        }
        author {
            node {
                name
                slug
                firstName
                lastName
            }
        }
    }
`

const BlogPreviewFragment = `
    fragment BlogPreviewFragment on WPGraphQL_Post {
        id
        postId
        title
        uri
        date
        slug
        excerpt
        content
        featuredImage {
            node {
                sourceUrl
                altText
                imageFile {
                    childImageSharp {
                        fluid(maxHeight: 500, maxWidth: 800, quality: 90, cropFocus: CENTER) {
                            ...GatsbyImageSharpFluid_tracedSVG
                        }
                    }
                }
            }
        }
        categories {
            nodes {
                name
                slug
                id
            }
        }
        author {
            node {
                name
                slug
                firstName
                lastName
            }
        }
    }
`

module.exports.PostTemplateFragment = PostTemplateFragment
module.exports.BlogPreviewFragment = BlogPreviewFragment
