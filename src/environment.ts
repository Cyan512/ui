const protocol = process.env.NEXT_PUBLIC_STRAPI_PROTOCOL || 'http';
const host = process.env.NEXT_PUBLIC_STRAPI_HOST || 'localhost';
const port = process.env.NEXT_PUBLIC_STRAPI_PORT || '1337';

const environment = {
  strapi: {
    apiEndpoint: `${protocol}://${host}:${port}`,
  },
};

export default environment;
