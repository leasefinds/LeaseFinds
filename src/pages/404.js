import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    {/* <SEO title="404: Not found" /> */}

    <SEO wpseo={{ title: "404: Not found", metaDesc: "" }} />

    <h1 style={{ textAlign: "center", paddingTop: "50px" }}>NOT FOUND</h1>
    <p style={{ textAlign: "center" }}>
      You just hit a route that doesn&#39;t exist...
    </p>
  </Layout>
)

export default NotFoundPage
