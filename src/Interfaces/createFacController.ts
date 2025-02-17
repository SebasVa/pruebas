import fs from "fs";
import path from "path";
import pdf from "html-pdf";
import { Request, Response } from "express";
import { direccion } from "./direccion";

export const crearPDFFAC = async (req: Request, res: Response): Promise<void> => {
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

    const plantillaFicha = path.resolve("src", "ficha.html");
    const plantillaContrato = path.resolve("src", "contratoFac.html");

    if (!fs.existsSync(plantillaFicha) || !fs.existsSync(plantillaContrato)) {
      res.status(500).json({ status: "error", message: "Plantilla no encontrada" });
      return;
    }

    let contenidoHtml = fs.readFileSync(plantillaFicha, "utf8");
    let contenidoHtml1 = fs.readFileSync(plantillaContrato, "utf8");

    const replaceTokens = (html: string): string => {
      return html
        .replace(/{{cedula}}/g, cedula)
        .replace(/{{nombres}}/g, nombres)
        .replace(/{{apellidos}}/g, apellidos)
        .replace(/{{dir}}/g, dir)
        .replace(/{{parro}}/g, parro)
        .replace(/{{ciudad}}/g, ciudad)
        .replace(/{{celular}}/g, celular)
        .replace(/{{email}}/g, email)
        .replace(/{{fecha}}/g, dat.toISOString())
        .replace(/{{fecha1}}/g, fecha1);
    };

    contenidoHtml = replaceTokens(contenidoHtml);
    contenidoHtml1 = replaceTokens(contenidoHtml1);

    const pdfPathFicha = direccion(flujo, `${cedula}_ficha.pdf`);
    const pdfPathContrato = direccion(flujo, `${cedula}_contrato.pdf`);

    if (!pdfPathFicha || !pdfPathContrato) {
      res.status(500).json({ status: "error", message: "Ruta de destino no válida" });
      return;
    }

    // Crear directorios si no existen
    const dirPathFicha = path.dirname(pdfPathFicha);
    if (!fs.existsSync(dirPathFicha)) {
      fs.mkdirSync(dirPathFicha, { recursive: true });
    }

    const dirPathContrato = path.dirname(pdfPathContrato);
    if (!fs.existsSync(dirPathContrato)) {
      fs.mkdirSync(dirPathContrato, { recursive: true });
    }

    await new Promise((resolve, reject) => {
      pdf.create(contenidoHtml).toFile(pdfPathFicha, (error, result) => {
        if (error) {
          // console.error("Error creando el PDF de ficha:", error);
          reject(error);
        } else resolve(result);
      });
    });

    await new Promise((resolve, reject) => {
      pdf.create(contenidoHtml1).toFile(pdfPathContrato, (error, result) => {
        if (error) {
          // console.error("Error creando el PDF de contrato:", error);
          reject(error);
        } else resolve(result);
      });
    });

    res.status(200).json({ status: "success", message: "PDFs creados correctamente" });
  } catch (error) {
    // console.error("Error en crearPDFFAC:", error);
    res.status(500).json({ status: "error", message: "Error creando los PDFs" });
  }
};
