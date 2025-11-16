const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Capstone Employee API', version: '1.0.0' },
    components: {
      securitySchemes: {
        basicAuth: { type: 'http', scheme: 'basic' },
        bearerAuth: { type: 'http', scheme: 'bearer' },
        jwt: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        apiKey: { type: 'apiKey', in: 'header', name: 'x-api-key' },
        oauth2: {
          type: 'oauth2',
          flows: {
            authorizationCode: {
              authorizationUrl: 'https://github.com/login/oauth/authorize',
              tokenUrl: 'https://github.com/login/oauth/access_token',
              scopes: {}
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js'] // optionally write JSDoc in routes for full coverage
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
