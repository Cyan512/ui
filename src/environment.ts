const environment = {
  production: false,
  version: 'DEV',

  strapi: {
    apiEndpoint: process.env.NEXT_PUBLIC_STRAPI_URL,
  },
};

export default environment;
