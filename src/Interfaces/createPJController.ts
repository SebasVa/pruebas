// Utilidades comunes
import * as fs from "fs";
import * as pdf from "html-pdf";
import { Request, Response } from "express";
import { direccion } from "./direccion";

// Función para reemplazar tokens en las plantillas
const replaceTokens = (html: string, data: Record<string, string>): string => {
    return Object.keys(data).reduce(
        (result, key) => result.replace(new RegExp(`{{${key}}}`, "g"), data[key]),
        html
    );
};

// Controlador para crear PDFs de Persona Jurídica
export const crearPDFPJ = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombreEmpresa, rucEmpresa, nombreRLE, apellidoRLE, cedulaRLE, celular, ciudadEmpresa, direccionEmpresa, flujo } = req.body;

        if (!nombreEmpresa || !rucEmpresa || !nombreRLE || !apellidoRLE || !cedulaRLE) {
            res.status(400).json({ status: "error", message: "Datos insuficientes para generar PDFs" });
            return;
        }

        const fecha1 = new Date().toLocaleDateString("es-ES");
        const datos = {
            nombreEmpresa,
            rucEmpresa,
            nombreRLE,
            apellidoRLE,
            cedulaRLE,
            celular,
            ciudadEmpresa,
            direccionEmpresa,
            fecha1
        };

        const fichaPath = direccion(flujo, `${cedulaRLE}_ficha_PJ.pdf`);
        const contratoPath = direccion(flujo, `${cedulaRLE}_contrato_PJ.pdf`);

        // Plantillas disponibles
        const plantillas: Record<string, string> = {
            ficha: "../fichaPJ.html",
            contrato: "../contratoPJ.html"
        };

        // Crear Ficha
        const fichaTemplatePath = require.resolve(plantillas.ficha);
        const fichaHtml = replaceTokens(
            fs.readFileSync(fichaTemplatePath, "utf8"),
            datos
        );

        pdf.create(fichaHtml).toFile(fichaPath, (error, result) => {
            if (error) {
                // console.error("Error creando PDF de Ficha PJ:", error);
                res.status(500).json({ status: "error", message: "Error creando el PDF de Ficha PJ" });
                return;
            }

            // console.log("PDF de Ficha PJ creado:", result.filename);

            // Crear Contrato
            const contratoTemplatePath = require.resolve(plantillas.contrato);
            const contratoHtml = replaceTokens(
                fs.readFileSync(contratoTemplatePath, "utf8"),
                datos
            );

            pdf.create(contratoHtml).toFile(contratoPath, (error, result) => {
                if (error) {
                    console.error("Error creando PDF de Contrato PJ:", error);
                    res.status(500).json({ status: "error", message: "Error creando el PDF de Contrato PJ" });
                    return;
                }

                // console.log("PDF de Contrato PJ creado:", result.filename);
                res.status(200).json({
                    status: "success",
                    message: "PDFs creados correctamente"
                });
            });
        });
    } catch (error) {
        // console.error("Error en crearPDFPJ:", error);
        res.status(500).json({ status: "error", message: "Error creando los PDFs" });
    }
};
