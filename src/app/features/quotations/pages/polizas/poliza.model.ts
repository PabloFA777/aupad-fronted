export type PeriodicidadPago = 'mensual' | 'anual';
export type MonedaPoliza = 'Soles' | 'Dolares';
export type EstadoPoliza = 'vigente' | 'vencida' | 'anulada' | 'renovada';

export interface Poliza {
  id: number;
  clienteId: number;
  usuarioId: number;
  seguroId: number;
  numeroPoliza: string;
  companiaId: number;
  fechaInicio: string;
  fechaVencimiento: string;
  vigenciaMeses?: number;
  cobertura?: string;
  sumaAsegurada: number;
  periodicidadPago: PeriodicidadPago;
  moneda: MonedaPoliza;
  primaNeta: number;
  comisionPorcentaje?: number;
  fechaNotificacion?: string;
  cuotasPendientes?: number;
  cuotasPagadas?: number;
  polizaAnteriorId?: number | null;
  estado: EstadoPoliza;
  documentoPrincipalId?: number | null;
  creadoEn?: string;
  actualizadoEn?: string;
  usuarioCreoId?: number | null;
  usuarioActualizoId?: number | null;
}
