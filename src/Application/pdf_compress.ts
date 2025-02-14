import path from "path";
import fs from "fs";
import { compress } from "compress-pdf";

export async function compressPDF(origen: string, destino: string): Promise<void> {
  try {
    const pdf = path.resolve(origen);
    const buffer = await compress(pdf);

    const compressedPdf = path.resolve(destino);
    await fs.promises.writeFile(compressedPdf, buffer);

    console.log("PDF comprimido exitosamente.");
  } catch (error) {
    console.error("Error al comprimir el PDF:", error);
  }
}
