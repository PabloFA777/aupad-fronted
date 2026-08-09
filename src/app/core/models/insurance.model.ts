export interface InsuranceModel {
  id: number;
  categoriaId: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
  creadoEn?: string;
  actualizadoEn?: string;
}
