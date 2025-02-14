import fs from "fs";
import path from "path";
import pdf from "html-pdf";
import { Request, Response } from "express";
import { direccion } from "./direccion";

export const crearPDFFLUJO = async (req: Request, res: Response): Promise<void> => {
  try {
    const { flujo, cedula, nombres, apellidos, email, celular, dir, parro, ciudad } = req.body;

    if (!flujo || !cedula || !nombres || !apellidos) {
      res.status(400).json({ status: "error", message: "Faltan datos requeridos" });
      return;
    }

    const dat = new Date();
    const day = dat.getDate();
    const month = dat.getMonth() + 1;
    const year = dat.getFullYear();
    const fecha1 = `${day}-${month < 10 ? "0" : ""}${month}-${year}`;

    let plantilla: string;
    let plantilla1: string;

    plantilla = path.resolve("src", "ficha.html");
    plantilla1 = path.resolve("src", "contrato.html");

    if (!fs.existsSync(plantilla) || !fs.existsSync(plantilla1)) {
      res.status(500).json({ status: "error", message: "Plantilla no encontrada" });
      return;
    }

    let contenidoHtml = fs.readFileSync(plantilla, "utf8");
    let contenidoHtml1 = fs.readFileSync(plantilla1, "utf8");

    const replaceTokens = (html: string): string => {
      return html
        .replace("{{cedula}}", cedula)
        .replace("{{nombres}}", nombres)
        .replace("{{apellidos}}", apellidos)
        .replace("{{dir}}", dir)
        .replace("{{parro}}", parro)
        .replace("{{ciudad}}", ciudad)
        .replace("{{celular}}", celular)
        .replace("{{email}}", email)
        .replace("{{fecha1}}", fecha1);
    };

    contenidoHtml = replaceTokens(contenidoHtml);
    contenidoHtml1 = replaceTokens(contenidoHtml1);

    const pdfPath = direccion(flujo, `${cedula}_ficha_PN.pdf`);
    const pdfPath1 = direccion(flujo, `${cedula}_contrato_PN.pdf`);

    if (!pdfPath || !pdfPath1) {
      res.status(500).json({ status: "error", message: "Ruta de destino no válida" });
      return;
    }

    // Crear directorios si no existen
    const dirPath = path.dirname(pdfPath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    await new Promise((resolve, reject) => {
      pdf.create(contenidoHtml).toFile(pdfPath, (error, result) => {
        if (error) {
          console.error("Error creando el primer PDF:", error);
          reject(error);
        } else resolve(result);
      });
    });

    await new Promise((resolve, reject) => {
      pdf.create(contenidoHtml1).toFile(pdfPath1, (error, result) => {
        if (error) {
          console.error("Error creando el segundo PDF:", error);
          reject(error);
        } else resolve(result);
      });
    });

    res.status(200).json({ status: "success", message: "PDFs creados correctamente" });
  } catch (error) {
    console.error("Error en crearPDFFLUJO:", error);
    res.status(500).json({ status: "error", message: "Error creando el PDF" });
  }
};
