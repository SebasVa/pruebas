import { Router } from "express";
import { cargarArchivoFN } from "../../Interfaces/cargarArchivoController";

const router = Router();

/**
 * @swagger
 * /documentos:
 *   post:
 *     tags:
 *       - Procesar archivos
 *     summary: Cargar y procesar archivos en diferentes formatos
 *     description: Este endpoint permite cargar archivos desde una solicitud multipart o como datos codificados en base64. Si es un archivo PDF, puede comprimirlo opcionalmente.
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
 *                 description: Ruta lógica para determinar el destino del archivo.
 *                 example: "flujo1"
 *               archivo:
 *                 type: string
 *                 description: Contenido del archivo en formato base64 con prefijo MIME.
 *                 example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..."
 *               nombreEntrada:
 *                 type: string
 *                 description: Nombre del archivo que se desea guardar.
 *                 example: "imagen_ejemplo.png"
 *               tipo:
 *                 type: string
 *                 description: Tipo de archivo, actualmente solo "base64" es compatible.
 *                 example: "base64"
 *               convertir:
 *                 type: boolean
 *                 description: Indica si se debe comprimir el archivo si es un PDF.
 *                 example: false
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               flujoBin:
 *                 type: string
 *                 description: Ruta lógica para determinar el destino del archivo.
 *                 example: "flujo2"
 *               archivoBin:
 *                 type: string
 *                 description: Nombre del archivo cargado.
 *                 example: "documento_ejemplo.pdf"
 *               nombreEntradaBin:
 *                 type: string
 *                 description: Nombre del archivo que se desea guardar.
 *                 example: "documento_final.pdf"
 *               tipoBin:
 *                 type: string
 *                 description: Tipo del archivo cargado.
 *                 example: "binary"
 *     responses:
 *       200:
 *         description: Archivo procesado correctamente.
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
 *                   example: "Archivo subido exitosamente"
 *       400:
 *         description: Error de validación en la solicitud.
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
 *         description: Error en el servidor.
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
 *                   example: "Error al guardar el archivo"
 */
router.post("/documentos", cargarArchivoFN);

export default router;
