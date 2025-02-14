import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const accessTokenSecret = "your_access_token_secret"; // Usa el mismo secreto que en el código de autenticación

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Formato esperado: "Bearer <token>"

  if (!token) {
    res.status(401).json({ message: "Acceso no autorizado. Token requerido." });
    return;
  }

  try {
    jwt.verify(token, accessTokenSecret);
    next(); // Token válido, continuar con la solicitud
  } catch (error) {
    res.status(403).json({ message: "Token inválido o expirado." });
    return;
  }
};
