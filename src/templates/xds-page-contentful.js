import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const XdsPageTemplate = ({ data, location }) => {
  const post = data.contentfulPage
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

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
          <p>{post.created}</p>
        </header>
        {/* <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        /> */}
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
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
