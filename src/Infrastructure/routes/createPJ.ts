import { Router } from "express";
import { crearPDFPJ } from "../../Interfaces/createPJController";
import { authenticateToken } from "../../Domain/middleware/Autenticator";

const router = Router();

/**
 * @swagger
 * /datosContratoPJ:
 *   post:
 *     tags:
 *       - Crear Ficha y Contrato
 *     summary: Genera PDFs para una persona jurídica
 *     description: Endpoint que requiere autenticación con token para procesar datos de la ficha y contrato.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
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
 *               nombreEmpresa:
 *                 type: string
 *                 description: Nombre de la empresa.
 *                 example: "Empresa S.A."
 *               rucEmpresa:
 *                 type: string
 *                 description: RUC de la empresa.
 *                 example: "1234567890001"
 *               nombreRLE:
 *                 type: string
 *                 description: Nombre del representante legal.
 *                 example: "Carlos"
 *               apellidoRLE:
 *                 type: string
 *                 description: Apellido del representante legal.
 *                 example: "Ramírez"
 *               cedulaRLE:
 *                 type: string
 *                 description: Cédula del representante legal.
 *                 example: "0987654321"
 *               celular:
 *                 type: string
 *                 description: Número de celular de contacto.
 *                 example: "0987654321"
 *               ciudadEmpresa:
 *                 type: string
 *                 description: Ciudad donde opera la empresa.
 *                 example: "Quito"
 *               direccionEmpresa:
 *                 type: string
 *                 description: Dirección de la empresa.
 *                 example: "Av. Siempre Viva 456"
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
 *                   example: "Error creando el PDF"
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
router.post("/datosContratoPJ", authenticateToken, crearPDFPJ);

export default router;
