import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import StyledSideBar from "./sidebar.styles";
import WordMark from '../../images/wordmark.png'

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
          allContentfulGuidelines {
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
          <img height="35px" style={{marginBottom: '2rem'}} src={WordMark} alt="XDS Wordmark"/>
          <ol style={{ listStyle: `none` }}>
          <p style={{color: '#45bce5', fontWeight: 'bold'}}> - Component Specs </p>
            {data.allContentfulPage.edges.map(({ node }) => {
            return (
              <li key={node.slug}>
                <Link to={'/' + node.slug} itemProp="url">
                  <span>{node.title}</span>
                </Link>
              </li>
              )
              })}
          <p style={{color: '#45bce5', fontWeight: 'bold', marginTop: '2rem'}}> - XDS Guidelines </p>
            {data.allContentfulGuidelines.edges.map(({ node }) => {
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