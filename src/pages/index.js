import * as React from "react"
import Layout from "../components/layout"
import Banner from '../images/banner.png'

const BlogIndex = ({ location }) => {

  return (
    <Layout location={location}>
    <img src={Banner} width="750px" style={{marginBottom: '4rem'}} alt="XDS Banner"/>
      <p> This site exists to maintain Allstate's online brand image, 
        promote consistency, encourage reusability and improve efficiency without limiting creativity.</p> 

      <p> XDS 3.0 is the latest evolution of Allstate's design system. It combines our XDS guidelines, 
        representing our design styles and standards, and Mesh, 
        representing coded components and front end standards.</p> 
    </Layout>
  )
}

export default BlogIndex
