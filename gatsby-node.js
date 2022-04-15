const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Defines a template for each xds documentation page / component
  const componentUsagePage = path.resolve(`./src/templates/componentUsage.js`)
  const guidelinesPage = path.resolve(`./src/templates/guidelines.js`)

  // Get the contentful pages 
  const result = await graphql(
    `
      {
        allContentfulPage {
          edges {
            node {
              slug
              title
              internal {
                type
              }
          }
        }
      }
      allContentfulGuidelines {
        edges {
          node {
            slug
            title
            internal {
              type
            }
        }
      }
    }
    }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your pages`,
      result.errors
    )
    return
  }

  const componentPosts = result.data.allContentfulPage.edges
  const guidelinePosts = result.data.allContentfulGuidelines.edges


  // Create pages based on contentful content types - currently (component specs) and (guidelines) only
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (componentPosts.length > 0) {
    componentPosts.forEach((post) => {

      createPage({
        path: post.node.slug,
        component: componentUsagePage,
        context: {
          slug: post.node.slug,
        },
      })
    })
  }
  if (guidelinePosts.length > 0) {
    guidelinePosts.forEach((post) => {

      createPage({
        path: post.node.slug,
        component: guidelinesPage,
        context: {
          slug: post.node.slug,
        },
      })
    })
  }
}
