export interface CompaniaSeguro {
  id: number;
  nombre: string;
  ruc?: string | null;
  telefono?: string | null;
  correo?: string | null;
  direccion?: string | null;
  paginaWeb?: string | null;
  contactoComercial?: string | null;
  activo: boolean;
  creadoEn: Date;
  actualizadoEn: Date;
  usuarioCreoId?: number | null;
  usuarioActualizoId?: number | null;
}
