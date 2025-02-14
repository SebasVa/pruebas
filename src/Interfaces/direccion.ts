import path from "path";

// Configurar directorio base
const BASE_DIR = "C:\\adss_storage"; // Cambiar según las necesidades

// Lista de flujos válidos
const VALID_FLUJOS = [
  "normal",
  "credifin",
  "issfa",
  "fiducia",
  "san_francisco",
  "generic",
  "mi_negocio",
  "puntonet",
  "pruebas",
  "massend",
  "alianza",
  "issfa_supervivencia",
  "firmador_v",
  "atlantida",
  "firmador",
  "pre_equifax",
];

export function direccion(flujo: string, filename: string): string | undefined {
  if (!flujo || !VALID_FLUJOS.includes(flujo)) {
    return undefined; // Si el flujo no es válido, retorna undefined
  }

  return path.join(BASE_DIR, flujo, "ra", filename);
}
