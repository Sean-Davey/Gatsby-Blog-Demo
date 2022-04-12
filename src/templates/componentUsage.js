import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS } from "@contentful/rich-text-types"
import { GatsbyImage, getImage } from "gatsby-plugin-image";


const componentUsageTemplate = ({ data, location }) => {
  const post = data.contentfulPage;
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  const documentationOptions = {
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

  const a11yOutput = renderRichText(post.accessibility);
  const guidelinesOutput = renderRichText(post.guidelines);
  const documentation = renderRichText(post.documentation, documentationOptions)



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
          <hr/>
          {documentation}
          <hr/>
          {guidelinesOutput}
          <hr/>
          {a11yOutput}
          <Link to={post.code.raw} itemProp="url">
            <span>Mesh Component Library Implementation</span>
          </Link>
        </header>
        <hr />
      </article>
    </Layout>
  )
}

export default componentUsageTemplate

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
      updatedAt
      slug
      documentation {
        raw
        references {
					... on ContentfulAsset {
            contentful_id
            title
            description
            gatsbyImageData(width: 1000)
            __typename
          }
        }
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
