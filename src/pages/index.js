import * as React from "react"

import Layout from "../components/layout"

const BlogIndex = ({ location }) => {

  return (
    <Layout location={location}>
      <h1> XDS POC </h1>
      <p> This site exists to maintain Allstate's online brand image, 
        promote consistency, encourage reusability and improve efficiency without limiting creativity.</p> 
    </Layout>
  )
}

export default BlogIndex
