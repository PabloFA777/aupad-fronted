export interface DocumentTypeModel {
  id: number;
  code: string;
  description: string;
  status: 'Activo' | 'Inactivo';
}
