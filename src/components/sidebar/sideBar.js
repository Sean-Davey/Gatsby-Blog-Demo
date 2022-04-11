import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import StyledSideBar from "./sidebar.styles";

export default function SideBar() {
  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          allContentfulPage {
            edges {
              node {
                title
                slug
              }
            }
          }
        }
      `}
      render={data => (
        <StyledSideBar>
          <ol style={{ listStyle: `none` }}>
            {data.allContentfulPage.edges.map(({ node }) => {
            return (
              <li key={node.slug}>
                <Link to={'/' + node.slug} itemProp="url">
                  <span>{node.title}</span>
                </Link>
              </li>
              )
              })}
          </ol>
        </StyledSideBar>
      )}
    />
  )
}