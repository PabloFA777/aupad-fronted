export interface Rol {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
  creadoEn: Date;
  actualizadoEn: Date;
  usuarioCreoId: number;
  usuarioActualizoId: number;
}