const {
  PostTemplateFragment,
  BlogPreviewFragment,
} = require("../src/templates/data.js")

const { FluidImageFragment } = require("../src/templates/fragments")

const blogURI = "blog"

const postTemplate = require.resolve("../src/templates/post.js")
const blogTemplate = require.resolve("../src/templates/blog.js")

const GET_POSTS = `
        # Here we make use of the imported fragments which are referenced above
        ${FluidImageFragment}
        ${PostTemplateFragment}
        ${BlogPreviewFragment}
        query GET_POSTS($first:Int $after:String) {
            wpgraphql {
                posts(
                    first: $first
                    after: $after
                    # This will make sure to only get the parent nodes and no children
                    where: {
                        parent: null
                    }
                ) {
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
                    nodes {           
                        uri     
                        
                        # This is the fragment used for the Post Template
                        ...PostTemplateFragment
                        
                        #This is the fragment used for the blog preview on archive pages
                        ...BlogPreviewFragment
                    }
                }
            }
        }
    `

const allPosts = []
const blogPages = []
let pageNumber = 0
const itemsPerPage = 1000

/**
 * This is the export which Gatbsy will use to process.
 *
 * @param { actions, graphql }
 * @returns {Promise<void>}
 */
module.exports = async ({ actions, graphql, reporter }, options) => {
  /**
   * This is the method from Gatsby that we're going
   * to use to create posts in our static site.
   */
  const { createPage } = actions

  /**
   * Fetch posts method. This accepts variables to alter
   * the query. The variable `first` controls how many items to
   * request per fetch and the `after` controls where to start in
   * the dataset.
   *
   * @param variables
   * @returns {Promise<*>}
   */
  const fetchPosts = async variables =>
    /**
     * Fetch posts using the GET_POSTS query and the variables passed in.
     */
    await graphql(GET_POSTS, variables).then(({ data }) => {
      /**
       * Extract the data from the GraphQL query results
       */
      const {
        wpgraphql: {
          posts: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data

      /**
       * Define the path for the paginated blog page.
       * This is the url the page will live at
       * @type {string}
       */
      const blogPagePath = !variables.after
        ? `${blogURI}/`
        : `${blogURI}/page/${pageNumber + 1}`

      /**
       * Add config for the blogPage to the blogPage array
       * for creating later
       *
       * @type {{
       *   path: string,
       *   component: string,
       *   context: {nodes: *, pageNumber: number, hasNextPage: *}
       * }}
       */
      blogPages[pageNumber] = {
        path: blogPagePath,
        component: blogTemplate,
        context: {
          nodes,
          pageNumber: pageNumber + 1,
          hasNextPage,
          itemsPerPage,
          allPosts,
        },
      }

      /**
       * Map over the posts for later creation
       */
      nodes &&
        nodes.map(posts => {
          allPosts.push(posts)
        })

      /**
       * If there's another post, fetch more
       * so we can have all the data we need.
       */
      if (hasNextPage) {
        pageNumber++
        reporter.info(`fetch post ${pageNumber} of posts...`)
        return fetchPosts({ first: itemsPerPage, after: endCursor })
      }

      /**
       * Once we're done, return all the posts
       * so we can create the necessary posts with
       * all the data on hand.
       */
      return allPosts
    })

  /**
   * Kick off our `fetchPosts` method which will get us all
   * the posts we need to create individual posts.
   */
  await fetchPosts({ first: itemsPerPage, after: null }).then(wpPosts => {
    wpPosts &&
      wpPosts.map((post, index) => {
        /**
         * Build post path based of theme blogURI setting.
         */
        const path = `${post.uri}`

        const previous =
          index === wpPosts.length - 1 ? null : wpPosts[index + 1]
        const next = index === 0 ? null : wpPosts[index - 1]

        createPage({
          path: path,
          component: postTemplate,
          context: {
            post: post,
            previous,
            next,
          },
        })

        reporter.info(`post created:  ${post.uri}`)
      })

    reporter.info(`# -----> POSTS TOTAL: ${wpPosts.length}`)

    /**
     * Map over the `blogPages` array to create the
     * paginated blog pages
     */
    blogPages &&
      blogPages.map(blogPage => {
        if (blogPage.context.pageNumber === 1) {
          blogPage.context.publisher = true
          blogPage.context.label = blogPage.path.replace("/", "")
        }
        createPage(blogPage)
        reporter.info(
          `created blog archive page ${blogPage.context.pageNumber}`
        )
      })
  })
}

// function transformSinglePostTags(tags) {
//   var arr = []
//   if (tags) {
//     tags.nodes.forEach((element, i) => {
//       arr.push(element.slug)
//     })
//   }
//   return arr
// }

// function getPostsFromQuery(posts) {
//   if (posts) {
//     var newPosts = []

//     // loop thought array to assign TAGS property of object
//     posts.forEach((element, i) => {
//       var tags = []

//       //check if post has tags
//       if (element.tags.nodes.length && element.tags.nodes.length > 0) {
//         element.tags.nodes.forEach((e, i) => {
//           tags.push(e.slug)
//         })
//       } else {
//         //if post doesnt have tags
//         console.log(`POST ${element.slug} DOESNT HAVE TAGS`)
//       }

//       //push propertries to a new array slug and tags
//       newPosts.push({
//         id: element.id,
//         postId: element.postId,
//         title: element.title,
//         slug: element.slug,
//         tags: tags,
//         content: element.content,
//         featuredImage: element.featuredImage,
//         categories: element.categories,
//         uri: element.uri,
//         author: element.author,
//         date: element.date,
//         excerpt: element.excerpt,
//       })
//     })

//     return newPosts
//   }

//   return []
// }

// function removeCurrentPostFromRelated(result, slug) {
//   const final = []

//   result.forEach(single => {
//     if (single.slug !== slug) {
//       final.push(single)
//     }
//   })

//   return final
// }
