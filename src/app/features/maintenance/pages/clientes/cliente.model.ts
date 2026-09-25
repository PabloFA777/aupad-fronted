export type TipoCliente = 'natural' | 'juridica';
export type TipoDocumentoCliente = 'DNI' | 'RUC' | 'PASAPORTE' | 'CE';

export interface Cliente {
  id: number;
  tipoCliente: TipoCliente;
  tipoDocumento: TipoDocumentoCliente;
  numeroDocumento: string;
  nombreRazonSocial: string;
  correo: string;
  telefono: string;
  direccion?: string;
  observaciones?: string;
  usuarioId: number;
  activo: boolean;
  creadoEn?: string;
  actualizadoEn?: string;
  usuarioCreoId?: number | null;
  usuarioActualizoId?: number | null;
}
