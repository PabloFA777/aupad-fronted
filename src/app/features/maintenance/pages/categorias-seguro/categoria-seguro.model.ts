export interface CategoriaSeguro {
  id: number;
  nombre: string;
  categoriaPadreId?: number | null;
  activo: boolean;
  creadoEn: Date;
  actualizadoEn: Date;
  usuarioCreoId?: number | null;
  usuarioActualizoId?: number | null;
}
