import { Router } from "express";
import { crearPDFFLUJO } from "../../Interfaces/createController";
import { authenticateToken } from "../../Domain/middleware/Autenticator";

const router = Router();

/**
 * @swagger
 * /datosContrato:
 *   post:
 *     tags:
 *       - Crear Ficha y Contrato
 *     summary: Genera PDFs para una persona
 *     description: Endpoint que requiere autenticación con token para procesar datos de la ficha y contrato.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos del contrato
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               flujo:
 *                 type: string
 *                 description: Identificador del flujo de generación del PDF.
 *                 example: "normal"
 *               cedula:
 *                 type: string
 *                 description: Identificación de la persona.
 *                 example: "1234567890"
 *               nombres:
 *                 type: string
 *                 description: Nombre de la persona.
 *                 example: "Juan"
 *               apellidos:
 *                 type: string
 *                 description: Apellido de la persona.
 *                 example: "Pérez"
 *               email:
 *                 type: string
 *                 description: Correo electrónico de la persona.
 *                 example: "juan.perez@example.com"
 *               celular:
 *                 type: string
 *                 description: Número de celular de la persona.
 *                 example: "0987654321"
 *               dir:
 *                 type: string
 *                 description: Dirección de la persona.
 *                 example: "Av. Siempre Viva 123"
 *               parro:
 *                 type: string
 *                 description: Parroquia de residencia.
 *                 example: "Centro"
 *               ciudad:
 *                 type: string
 *                 description: Ciudad de residencia.
 *                 example: "Quito"
 *     responses:
 *       200:
 *         description: PDFs creados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "PDFs creados correctamente"
 *       400:
 *         description: Faltan datos requeridos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Faltan datos requeridos" 
 *       500:
 *         description: Error en la creación de los PDFs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Error creando el PDF"
 */
router.post("/datosContrato", authenticateToken, crearPDFFLUJO);



export default router;
