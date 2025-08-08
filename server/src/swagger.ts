import swaggerJsdoc from 'swagger-jsdoc';


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CashKick API Swagger',
            version: '1.0.0',
            description: 'CashKick API Swagger description',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./src/routes/*.ts','./src/controllers/*.ts'],
};

const specs = swaggerJsdoc(options);

export default specs;