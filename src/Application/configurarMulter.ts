import multer, { StorageEngine } from "multer";
import { RequestHandler } from "express";

const destination: string = "C:\\\\tmp\\\\";

class MulterConfig {
  public storage: StorageEngine;
  public upload: RequestHandler; // Cambiado a RequestHandler

  constructor() {
    this.storage = multer.diskStorage({
      destination, // Ruta temporal donde se guardarán los archivos
      filename: (req, file, cb) => {
        // Mantener el nombre de archivo original en la ubicación temporal
        cb(null, file.originalname);
      },
    });

    this.upload = multer({ storage: this.storage }).single("archivo");
  }
}

export default MulterConfig;
