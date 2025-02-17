import path from "path";

const FLUJO_PATHS: Record<string, string> = {
  normal: "C:\\adss_creacion_cert\\dist\\data\\ra\\",
  credifin: "C:\\adss_credifin\\dist\\data\\ra\\",
  issfa: "C:\\adss_issfa\\dist\\data\\ra\\",
  fiducia: "C:\\adss_fiducia\\dist\\data\\ra\\",
  san_francisco: "C:\\adss_san_francisco\\dist\\data\\ra\\",
  generic: "C:\\adss_generic\\dist\\data\\ra\\",
  mi_negocio: "C:\\adss_mi_negocio\\dist\\data\\ra\\",
  puntonet: "C:\\adss_punto_net\\dist\\data\\ra\\",
  pruebas: "C:\\adss_pruebas\\dist\\data\\ra\\",
  massend: "C:\\adss_massend\\dist\\data\\ra\\",
  alianza: "C:\\adss_alianza\\dist\\data\\ra\\",
  issfa_supervivencia: "C:\\adss_issfa_supervivencia\\dist\\data\\ra\\",
  firmador_v: "C:\\adss_firmador_v\\dist\\data\\ra\\",
  atlantida: "C:\\adss_atlantida\\dist\\data\\ra\\",
  firmador: "C:\\adss_firmador\\dist\\data\\ra\\",
  pre_equifax: "C:\\adss_equifax\\dist\\data\\ra\\",
};

export function direccion(flujo: string, filename: string): string | undefined {
  const basePath = FLUJO_PATHS[flujo];
  return basePath ? path.join(basePath, filename) : undefined;
}
