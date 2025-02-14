import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API con Rutas Dinámicas",
      version: "1.0.0",
      description: "Documentación generada dinámicamente",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Servidor local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Este es opcional, pero recomendado
        },
      },
    }
  },
  apis: ["./src/Infrastructure/routes/*.ts", "./Infrastructure/routes/*.js"], // Automáticamente documenta las rutas
};

export default swaggerOptions;
