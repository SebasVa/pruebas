import fs from "fs";
import { direccion } from "./direccion";
import { Request, Response } from "express";

export function descargaArchivoFN(req: Request, res: Response): void {
  const { producto, flujo, archivo } = req.params;
  console.log(producto, flujo, archivo);

  // Obtener la ruta completa del archivo
  const filePath = direccion(flujo, archivo);

  // Validar que la ruta del archivo sea válida
  if (!filePath) {
    res.status(400).json({ status: "error", message: "Directorio no encontrado" });
    return;
  }

  // Verificar si el archivo existe en el sistema
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Si el archivo no existe, enviar un error 404
      res.status(404).json({ status: "error", message: "Archivo no encontrado" });
      return;
    }

    // Procesar dependiendo del tipo de producto (base64 o binario)
    switch (producto) {
      case "base64":
        try {
          // Leer el archivo en formato base64
          const fileData = fs.readFileSync(filePath, { encoding: "base64" });

          // Obtener la extensión del archivo para determinar el tipo MIME
          const extension = filePath.split(".").pop();
          let mimeType = "application/octet-stream"; // Valor por defecto

          // Asignar el tipo MIME correcto basado en la extensión
          switch (extension) {
            case "png":
              mimeType = "image/png";
              break;
            case "jpg":
            case "jpeg":
              mimeType = "image/jpeg";
              break;
            case "pdf":
              mimeType = "application/pdf";
              break;
            case "txt":
              mimeType = "text/plain";
              break;
            case "json":
              mimeType = "application/json";
              break;
            // Agrega más tipos según tus necesidades
            default:
              mimeType = "application/octet-stream";
          }

          // Enviar el archivo codificado en base64 junto con el tipo MIME
          res.status(200).json({status: "success",
            archivo: `data:${mimeType};base64,${fileData}`
          });
        } catch (readError: unknown) {
          // Si ocurre un error al leer el archivo, comprobar si el error es de tipo 'Error'
          if (readError instanceof Error) {
            // Devolver un error 500 con el mensaje de error
            res.status(500).json({ status: "error", message: "Error al leer el archivo en base64" });
          } else {
            // En caso de que no sea un 'Error', devolver un error genérico
            res.status(500).json({ status: "error", message: "Error desconocido al leer el archivo en base64" });
          }
        }
        break;

      case "binario":
        // Si el producto es binario, se envía el archivo para su descarga
        res.download(filePath, (downloadError) => {
          if (downloadError) {
            // Si ocurre un error al intentar descargar el archivo
            if (!res.headersSent) {
              res.status(400).json({ status: "error", message: "Error al descargar el archivo" });
            }
          }
        });
        break;

      default:
        // Si el tipo de producto no es reconocido, devolver un error 404
        res.status(404).json({
          status: "error", message: "Tipo de descarga no especificado correctamente"
        });
        return;
    }
  });
}
