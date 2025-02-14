import { Router } from "express";
import { cuentaPdf } from "../../Interfaces/verificarArchivoController";
import { authenticateToken } from "../../Domain/middleware/Autenticator";

const router = Router();

/**
 * @swagger
 * /verificar/{flujo}/{archivo}:
 *   get:
 *     tags:
 *       - Procesar archivos
 *     summary: Verifica la existencia del archivo 
 *     description: Verifica la existencia del archivo en el directoririo correspondiente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: flujo
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del flujo o directorio que contiene el archivo.
 *       - in: path
 *         name: archivo
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del archivo.
 *     responses:
 *       200:
 *         description: Archivo verificado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 is_available:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Directorio no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 is_available:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Archivo no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 is_available:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Error en el servidor al procesar el archivo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 is_available:
 *                   type: boolean
 *                   example: false
 */
router.get("/verificar/:flujo/:archivo", authenticateToken, cuentaPdf);

export default router;