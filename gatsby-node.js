const path = require(`path`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  await createResolvers({
    WPGraphQL_MediaItem: {
      imageFile: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.sourceUrl

          if (source.mediaItemUrl !== undefined) {
            sourceUrl = source.mediaItemUrl
          }

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}


// BLOG 
const createPosts = require("./create/createPosts")

exports.createPagesStatefully = async (
  { graphql, actions, reporter },
  options
) => {
  await createPosts({ actions, graphql, reporter }, options)
}

// PAGES
module.exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const pageFilter = path.resolve("src/templates/page.js")

  const query = await graphql(`
    {
      wpgraphql {
        pages(first: 500) {
          edges {
            node {
              id
              uri
              title
            }
          }
        }
      }
    }
  `)

  // pages
  query.data.wpgraphql.pages.edges.forEach(edge => {
    if (
      edge.node.uri === "/global-information/" ||
      edge.node.uri === "/" ||
      edge.node.uri === "/blog/"
    ) {
      reporter.info('skip: ' + edge.node.uri)
    } else {
      createPage({
        component: pageFilter,
        path: edge.node.uri,
        context: {
          id: edge.node.id,
        },
      })
    }
  })
}
