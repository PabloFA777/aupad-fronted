import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseCrudService<T> {
  protected abstract endpoint: string;
  private headers = new HttpHeaders({
    'X-Aupad-Client': 'aupad-frontend'
  });

  constructor(protected http: HttpClient) { }

  obtenerTodos(): Observable<T[]> {
    return this.http.get<T[]>(`${environment.apiUrl}/${this.endpoint}`, { headers: this.headers });
  }

  obtenerPorId(id: number): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}/${this.endpoint}/${id}`, { headers: this.headers });
  }

  crear(item: T): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}/${this.endpoint}`, item, { headers: this.headers });
  }

  actualizar(id: number, item: T): Observable<T> {
    return this.http.put<T>(`${environment.apiUrl}/${this.endpoint}/${id}`, item, { headers: this.headers });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/${this.endpoint}/${id}`, { headers: this.headers });
  }
}