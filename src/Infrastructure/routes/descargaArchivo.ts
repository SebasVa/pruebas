import { Router } from "express";
import { descargaArchivoFN } from "../../Interfaces/descargaArchivoController";
import { authenticateToken } from "../../Domain/middleware/Autenticator";

const router = Router();

/**
 * @swagger
 * /descargaArchivo/{producto}/{flujo}/{archivo}:
 *   get:
 *     tags:
 *       - Procesar archivos
 *     summary: Descarga o consulta un archivo en diferentes formatos
 *     description: Este endpoint permite descargar un archivo en formato binario o obtener su contenido codificado en base64.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: producto
 *         required: true
 *         schema:
 *           type: string
 *           enum: [base64, binario]
 *         description: Tipo de respuesta esperada. Puede ser `base64` o `binario`.
 *       - in: path
 *         name: flujo
 *         required: true
 *         schema:
 *           type: string
 *         description: Ruta lógica que define la ubicación del archivo.
 *       - in: path
 *         name: archivo
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del archivo a descargar o consultar.
 *     responses:
 *       200:
 *         description: Archivo descargado o contenido obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 archivo:
 *                   type: string
 *                   description: Contenido del archivo codificado en base64 (si `producto` es `base64`).
 *       400:
 *         description: Error de validación en la solicitud o archivo no encontrado.
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
 *                   example: "Error al descargar el archivo"
 *       404:
 *         description: Archivo no encontrado o tipo de descarga no especificado.
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
 *                   example: "Archivo no encontrado"
 *       500:
 *         description: Error interno al procesar el archivo.
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
 *                   example: "Error al leer el archivo en base64"
 */
router.get("/descargaArchivo/:producto/:flujo/:archivo", authenticateToken, descargaArchivoFN);

export default router;
