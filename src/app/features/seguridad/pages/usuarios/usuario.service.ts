import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseCrudService<Usuario> {
  protected endpoint = 'Usuario';

  constructor(protected override http: HttpClient) {
    super(http);
  }
}