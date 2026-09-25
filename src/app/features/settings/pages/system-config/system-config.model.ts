export interface SystemConfigModel {
  id: number;
  clave: string;
  valor: string;
  descripcion?: string;
  creadoEn?: string;
  actualizadoEn?: string;
  usuarioCreoId?: number | null;
  usuarioActualizoId?: number | null;
}
