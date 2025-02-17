import path from "path";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno

const FLUJO_PATHS: Record<string, string> = {
  normal: process.env.FLUJO_NORMAL || "",
  credifin: process.env.FLUJO_CREDIFIN || "",
  issfa: process.env.FLUJO_ISSFA || "",
  fiducia: process.env.FLUJO_FIDUCIA || "",
  san_francisco: process.env.FLUJO_SAN_FRANCISCO || "",
  generic: process.env.FLUJO_GENERIC || "",
  mi_negocio: process.env.FLUJO_MI_NEGOCIO || "",
  puntonet: process.env.FLUJO_PUNTONET || "",
  pruebas: process.env.FLUJO_PRUEBAS || "",
  massend: process.env.FLUJO_MASSEND || "",
  alianza: process.env.FLUJO_ALIANZA || "",
  issfa_supervivencia: process.env.FLUJO_ISSFA_SUPERVIVENCIA || "",
  firmador_v: process.env.FLUJO_FIRMADOR_V || "",
  atlantida: process.env.FLUJO_ATLANTIDA || "",
  firmador: process.env.FLUJO_FIRMADOR || "",
  pre_equifax: process.env.FLUJO_PRE_EQUIFAX || "",
};

export function direccion(flujo: string, filename: string): string | undefined {
  const basePath = FLUJO_PATHS[flujo];
  return basePath ? path.join(basePath, filename) : undefined;
}
