export interface UserModel {
  id: number;
  rolId: number;
  nombre: string;
  apellido: string;
  correo: string;
  estado: 'activo' | 'inactivo';
  ingresoConfirmado: boolean;
  requiereCambioPassword: boolean;
  usuarioCreoId?: number | null;
  usuarioActualizoId?: number | null;
}
