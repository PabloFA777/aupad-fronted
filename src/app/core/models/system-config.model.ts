export interface SystemConfigModel {
  id: number;
  clave: string;
  valor: string;
  descripcion?: string;
  usuarioCreoId?: number | null;
  usuarioActualizoId?: number | null;
}
