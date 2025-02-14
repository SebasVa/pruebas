import { Router } from "express";
import { generateTokens, refreshAccessToken } from "../../Interfaces/authController";

const router = Router();

/**
 * @swagger
 * /auth/token:
 *   post:
 *     tags:
 *       - Acceso
 *     summary: Generar token de acceso y token de actualización
 *     description: Genera un token de acceso (de corta duración) y un token de actualización (de larga duración) para un usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username.
 *                 example: "user"
 *               password:
 *                 type: string
 *                 description: Password.
 *                 example: "pass"
 *     responses:
 *       200:
 *         description: Tokens generados con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 access_Token:
 *                   type: string
 *                   description: Token de acceso de corta duración.
 *                 refresh_Token:
 *                   type: string
 *                   description: token de actualización de larga duración.
 *       400:
 *         description: Credenciales inválidas.
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
 *                   example: "Credenciales inválidas"
 */
router.post("/auth/token", generateTokens);

/**
 * @swagger
 * /auth/token/refresh:
 *   post:
 *     tags:
 *       - Acceso
 *     summary: Actualizar el token de acceso
 *     description: Genera un nuevo token de acceso mediante un token de actualización válido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refresh_Token:
 *                 type: string
 *                 description: El token de actualización proporcionado durante la autenticación.
 *                 example: "valid_refresh_token"
 *     responses:
 *       200:
 *         description: Token de acceso actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 access_Token:
 *                   type: string
 *                   description: Token de acceso de corta duración actualizado.
 *       403:
 *         description: Token de actualización no válido o expirado.
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
 *                   example: "Token de actualizacion inválido o expirado"
 */
router.post("/auth/token/refresh", refreshAccessToken);

export default router;
