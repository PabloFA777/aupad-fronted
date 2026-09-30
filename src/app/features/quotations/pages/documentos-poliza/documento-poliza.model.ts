export interface DocumentoPoliza {
  id: number;
  polizaId: number;
  tipoDocumentoId: number;
  nombreArchivo: string;
  urlArchivo: string;
  activo: boolean;
  creadoEn?: string;
  actualizadoEn?: string;
  usuarioCreoId?: number | null;
  usuarioActualizoId?: number | null;
}
