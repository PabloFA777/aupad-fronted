export enum EstadoUsuario {
  Activo = 'activo',
  Inactivo = 'inactivo'
}

export interface Usuario {
  id: number;
  rolId: number;
  nombre: string;
  apellido: string;
  correo: string;
  passwordHash?: string;
  estado: EstadoUsuario;
  ingresoConfirmado: boolean;
  requiereCambioPassword: boolean;
  creadoEn?: string;
  actualizadoEn?: string;
  usuarioCreoId?: number | null;
  usuarioActualizoId?: number | null;
}