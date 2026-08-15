export interface DocumentType {
  id: number;
  nombre: string;
  descripcion: string | null;
  activo: boolean;
  creadoEn: string;
  actualizadoEn: string;
  usuarioCreoId: number | null;
  usuarioActualizoId: number | null;
}

// Para crear (POST): no se envía id ni los campos que genera el backend
export interface DocumentTypeCreate {
  nombre: string;
  descripcion: string | null;
}

// Para actualizar (PUT): tampoco se envían los campos de auditoría
export interface DocumentTypeUpdate {
  nombre: string;
  descripcion: string | null;
  activo: boolean;
}