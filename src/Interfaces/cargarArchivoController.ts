import fs from "fs";
import path from "path";
import { direccion } from "./direccion";
import MulterConfig from "../Application/configurarMulter";
import { compressPDF } from "../Application/pdf_compress";
import { Request, Response } from "express";

// Crear una instancia de la clase MulterConfig
const multerConfig = new MulterConfig();

export async function cargarArchivoFN(req: Request, res: Response): Promise<void> {
  const { flujo, archivo, nombreEntrada, tipo, convertir: convertirRaw } = req.body;
  const convertir = convertirRaw ? Boolean(convertirRaw) : false;

  if (!flujo || !archivo || !nombreEntrada || !tipo) {
    multerConfig.upload(req, res, (err: any) => {
      if (err) {
        res.status(400).json({ mensaje: "Faltan datos requeridos" });
      } else {
        if (!req.file) {
          res.status(400).json({ mensaje: "No se encontró el archivo en la solicitud" });
          return;
        }

        const { flujoBin, archivoBin, nombreEntradaBin, tipoBin } = req.body;
        if (!flujoBin || !archivoBin || !nombreEntradaBin || !tipoBin) {
          res.status(400).json({ mensaje: "Faltan datos requeridos" });
        } else {
          const rutaOrigen = path.join("C:\\\\tmp\\\\", req.file.originalname);
          const rutaDestino = direccion(flujoBin, nombreEntradaBin);

          if (rutaDestino) {
            fs.rename(rutaOrigen, rutaDestino, (error) => {
              if (error) {
                console.error("Error al mover el archivo:", error);
                res.status(400).json({ mensaje: "Error al mover el archivo", error });
              } else {
                console.log(`Archivo ${nombreEntradaBin} movido exitosamente`);
                res.status(200).json({
                  SUCCESS: `Archivo ${nombreEntradaBin} subido exitosamente`,
                });
              }
            });
          } else {
            res.status(400).json({ mensaje: "Ruta de destino no válida" });
          }
        }
      }
    });
  } else {
    const filePath = direccion(flujo, nombreEntrada);
    if (!filePath) {
      res.status(400).json({ mensaje: "Flujo no válido" });
      return;
    }

    // Verificar y procesar el archivo con prefijo MIME
    if (tipo === "base64") {
      const mimeRegex = /^data:(.+);base64,(.+)$/;
      const match = archivo.match(mimeRegex);

      if (!match) {
        res.status(400).json({ status: "error", mensaje: "Formato de archivo base64 no válido" });
        return;
      }

      const mimeType = match[1]; // Tipo MIME (e.g., image/png, application/pdf)
      const base64Data = match[2]; // Datos base64
      const decodedFile = Buffer.from(base64Data, "base64");

      // Determinar la extensión del archivo basada en el tipo MIME
      const extension = mimeType.split("/")[1];
      const finalPath = filePath.endsWith(`.${extension}`)
        ? filePath
        : `${filePath}.${extension}`;

      fs.writeFile(finalPath, decodedFile, async (err) => {
        if (err) {
          res.status(500).json({ status: "error", mensaje: "Error al guardar el archivo" });
        } else {
          try {
            if (mimeType === "application/pdf" && convertir) {
              await compressPDF(finalPath, finalPath);
            }
            res.status(200).json({ status: "success", mensaje: "Archivo guardado exitosamente" });
          } catch (error) {
            console.error("Error al comprimir el PDF:", error);
            res.status(500).json({ status: "error", mensaje: "Error al comprimir el PDF" });
          }
        }
      });
    } else {
      res.status(400).json({ status: "error", mensaje: "Tipo de archivo no compatible" });
    }
  }
}
