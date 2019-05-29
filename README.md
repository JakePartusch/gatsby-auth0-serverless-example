> A todo application built with Gatsby, and the Serverless Framework, using Auth0 for security.

## Getting Started

### Running the frontend locally:

```
yarn start
```

### Auth0

Edit the `.env.development` and `.env.production` files with your Auth0 config
Replace the `public_key` file in /api

### API

Deploying the API(requires AWS API keys):

```
cd api
serverless deploy
```

Edit the proxy in `gatsby-config.js` to point to your deployed api
