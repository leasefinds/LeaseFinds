module.exports = {
  siteMetadata: {
    siteUrl: `https://leasefindswebsite.netlify.app`,
    title: `LeaseFinds`,
    description: ``,
    image: `/icons/icon.png`,
    siteName: "LeaseFinds",
    siteLanguage: "en",
    ogLanguage: "en_US",
    icon: `/icons/icon.png`,
  },
  plugins: [
    `gatsby-plugin-netlify`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `LeaseFinds`,
        short_name: `LeaseFinds`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: "WPGraphQL",
        fieldName: "wpgraphql",
        url: `https://leasefinds2.wptestprev.icu/graphql`,
        refetchInterval: 30,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-anchor-links`,
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Montserrat",
              variants: ["200", "400", "500"],
              fontDisplay: "swap",
            },
            {
              family: "Varela Round",
              fontDisplay: "swap",
            },
            {
              family: "Poppins",
              variants: ["300"],
              fontDisplay: "swap",
            },
          ],
        },
        usePreload: true,
      },
    },
    {
      resolve: 'gatsby-wpgraphql-inline-images',
      options: {
        wordPressUrl: `https://leasefinds2.wptestprev.icu/`,
        uploadsUrl: `https://leasefinds2.wptestprev.icu/uploads/`,
        processPostTypes: ["Post"],
        graphqlTypeName: 'WPGraphQL',
      },
    },
    // {
    //   resolve: "gatsby-plugin-web-font-loader",
    //   options: {
    //     custom: {
    //       families: ["SFProDisplay"],
    //       urls: ["/fonts/fonts.css"],
    //     },
    //   },
    // },
    // `gatsby-plugin-preact`,
  ],
}
