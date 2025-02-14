import express from "express";
import fs from "fs";
import path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "../swagger";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware para manejar solicitudes grandes (aumentando el límite)
app.use(express.json({ limit: process.env.JSON_LIMIT}));
app.use(express.urlencoded({ limit: process.env.URLENCODED_LIMIT, extended: true }));

// Swagger setup
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Cargar rutas dinámicamente desde `src/Infrastructure/routes`
const routesPath = path.join(__dirname, "routes");
fs.readdirSync(routesPath).forEach((file) => {
  if (file.endsWith(".ts")) {
    const route = require(path.join(routesPath, file)).default;
    app.use("/api", route);
  }
});

// Server
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
});

export default app;
