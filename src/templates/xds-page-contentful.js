import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { renderRichText } from "gatsby-source-contentful/rich-text"


const XdsPageTemplate = ({ data, location }) => {
  const post = data.contentfulPage
  const siteTitle = data.site.siteMetadata?.title || `Title`

  console.log(post);

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.title}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <p>Created: {post.created}</p>
          <p>Last updated: {post.updatedAt}</p>
          <Link to={post.code.raw} itemProp="url">
            <span>Mesh Component Example</span>
          </Link>
        </header>
        <hr />
      </article>
    </Layout>
  )
}

export default XdsPageTemplate

export const pageQuery = graphql`
  query XdsPageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPage( slug: { eq: $slug }) {
      title
      created
      slug
      internal {
        fieldOwners
      }
      documentation {
        raw
      }
      guidelines {
        raw
      }
      accessibility {
        raw
      }
      code {
        raw
      }
    }
  }
`
