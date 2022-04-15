import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS } from "@contentful/rich-text-types"
import { GatsbyImage, getImage } from "gatsby-plugin-image";


const guidelinesTemplate = ({ data, location }) => {
  const post = data.contentfulGuidelines;
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  const bodyOptions = {
    renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { gatsbyImageData, description } = node.data.target
      return (
        <GatsbyImage
          image={getImage(gatsbyImageData)}
          alt={description}
          />
      )
    },
  }
}

  const body = renderRichText(post.body, bodyOptions)

  console.log(post);

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <p>Created: {post.created}</p>
          <p>Last updated: {post.updatedAt}</p>
          <hr/>
          {body}
        </header>
        <hr />
      </article>
    </Layout>
  )
}

export default guidelinesTemplate

export const pageQuery = graphql`
  query GuidelinesBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulGuidelines( slug: { eq: $slug }) {
      title
      created
      updatedAt
      slug
      body {
        raw
        references {
        contentful_id
        title
        description
        gatsbyImageData(width: 1000)
        __typename
        }
      }
    }
  }
`
