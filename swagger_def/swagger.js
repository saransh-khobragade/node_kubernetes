const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: 'LIFO stack application',
        version: '1.0.0',
        description: 'Endpoints to the APIs',
    },
    host: 'http://localhost:3000/',
    basePath: '/',
    servers: [
        {
            url: 'http://localhost:3000/'
        }
    ]
};
const options = {
    swaggerDefinition,
    apis: [
        "../index.js",
        "./swagger_def/*.yaml"
    ],
};

module.exports=options