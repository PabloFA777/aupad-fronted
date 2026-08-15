import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  DocumentType,
  DocumentTypeCreate,
  DocumentTypeUpdate
} from '../models/document-type.model';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  private readonly baseUrl = `${environment.apiUrl}/TipoDocumento`;

  // Header obligatorio que exige el CustomMiddleware del backend
  private readonly headers = new HttpHeaders({
    'X-Aupad-Client': 'aupad-frontend'
  });

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<DocumentType[]> {
    return this.http.get<DocumentType[]>(this.baseUrl, { headers: this.headers });
  }

  obtenerPorId(id: number): Observable<DocumentType> {
    return this.http.get<DocumentType>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }

  crear(data: DocumentTypeCreate): Observable<DocumentType> {
    return this.http.post<DocumentType>(this.baseUrl, data, { headers: this.headers });
  }

  actualizar(id: number, data: DocumentTypeUpdate): Observable<DocumentType> {
    return this.http.put<DocumentType>(`${this.baseUrl}/${id}`, data, { headers: this.headers });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }
}