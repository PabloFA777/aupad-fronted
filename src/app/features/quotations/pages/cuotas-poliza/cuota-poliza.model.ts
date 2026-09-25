export type EstadoCuota = 'pendiente' | 'pagada' | 'vencida';
export type MetodoPagoCuota = 'transferencia' | 'efectivo' | 'tarjeta' | 'yape' | 'plin';

export interface CuotaPoliza {
  id: number;
  polizaId: number;
  numeroCuota: number;
  monto: number;
  fechaVencimientoCuota: string;
  estado: EstadoCuota;
  montoPagado?: number | null;
  fechaPago?: string | null;
  metodoPago?: MetodoPagoCuota | null;
  creadoEn?: string;
  actualizadoEn?: string;
  usuarioCreoId?: number | null;
  usuarioActualizoId?: number | null;
}
