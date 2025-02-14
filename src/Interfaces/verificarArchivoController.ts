// import path from "path";
import fs from "fs";
import { direccion } from "./direccion";
// import { PDFDocument } from "pdf-lib";
import { Request, Response } from "express";

type NodeJsError = Error & { code?: string };

export async function cuentaPdf(req: Request, res: Response): Promise<void> {
    const { flujo, archivo } = req.params;

    const filePath = direccion(flujo, archivo);
    if (!filePath) {
        res.status(400).json({ status: "error", is_available: false });
        return;
    }

    try {
        // Verificar si el archivo existe
        await fs.promises.access(filePath, fs.constants.F_OK);

        // Leer el archivo en formato base64
        // const fileData = await fs.promises.readFile(filePath, { encoding: "base64" });

        // const pdfBytes = Buffer.from(fileData, "base64");
        // const pdfDoc = await PDFDocument.load(pdfBytes);

        // No es necesario obtener las páginas del PDF si no se requiere esa información
        // const totalPages = pdfDoc.getPageCount();
        //   console.log({ Archivo: archivo, Paginas: totalPages });

        // Enviar la respuesta sin la propiedad total_pages
        res.status(200).json({ status: "success", is_available: true });
    } catch (err) {
        const error = err as NodeJsError;
        if (error.code === "ENOENT") {
            // El archivo no existe
            res.status(404).json({ status: "error", is_available: false });
        } else {
            // Otros errores
            res.status(500).json({ status: "error", is_available: false });
        }
    }
}
