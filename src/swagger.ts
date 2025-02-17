import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables del archivo .env

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
        url: process.env.SWAGGER_SERVER_URL,
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
