const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Book Store',
            version: '1.0.0',
            description: 'A book store API',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js', './src/docs/components.yaml'],
};

const specs = swaggerJsdoc(options);

module.exports = {
    specs,
    swaggerUi,
};

