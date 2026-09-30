export type EstadoBeneficiario = 'Activo' | 'Retirado';

export interface BeneficiarioPoliza {
  id: number;
  polizaId: number;
  dni: string;
  nombres: string;
  cargo?: string;
  remuneracion?: number;
  mes: number;
  anio: number;
  estado: EstadoBeneficiario;
  creadoEn?: string;
  actualizadoEn?: string;
  usuarioCreoId?: number | null;
  usuarioActualizoId?: number | null;
}
