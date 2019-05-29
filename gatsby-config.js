/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {},
    },
  ],
  proxy: {
    prefix: "/dev",
    url: "https://pl8m4oh96g.execute-api.us-east-1.amazonaws.com",
  },
}
