import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const accessTokenSecret = "your_access_token_secret";
const refreshTokenSecret = "your_refresh_token_secret";

// In-memory storage for refresh tokens
const refreshTokens: Set<string> = new Set();

// Generate Tokens
export const generateTokens = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  // Validate user credentials (Replace with real validation)
  if (username === "user" && password === "pass") {
    // Generate access token (1-minute expiration)
    const accessToken = jwt.sign({ username }, accessTokenSecret, { expiresIn: "1m" });

    // Generate refresh token (10-hour expiration)
    const refreshToken = jwt.sign({ username }, refreshTokenSecret, { expiresIn: "10h" });

    // Store refresh token
    refreshTokens.add(refreshToken);

    res.status(200).json({ status: "success", access_Token: accessToken, refresh_Token: refreshToken });
    return;
  }

  res.status(400).json({ status: "error", message: "Credenciales inválidas" });
  return;
};

// Refresh Access Token
export const refreshAccessToken = (req: Request, res: Response) => {
  const { refresh_Token } = req.body;

  if (!refresh_Token) {
    res.status(403).json({ status: "error", message: "Token de actualizacion requerido" });
    return;
  }

  // Validate the refresh token
  if (!refreshTokens.has(refresh_Token)) {
    res.status(403).json({ status: "error", message: "Token de actualizacion inválido o expirado" });
    return;
  }

  try {
    const decoded = jwt.verify(refresh_Token, refreshTokenSecret) as jwt.JwtPayload;
    const newAccessToken = jwt.sign({ username: decoded.username }, accessTokenSecret, { expiresIn: "1m" });
    res.status(200).json({ status: "success", access_Token: newAccessToken });
    return;
  } catch (err) {
    res.status(403).json({ status: "error", message: "Token de actualizacion inválido o expirado" });
    return;
  }
};
