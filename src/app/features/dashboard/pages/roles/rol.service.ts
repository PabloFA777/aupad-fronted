import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { Rol } from './rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService extends BaseCrudService<Rol> {
  protected endpoint = 'Rol';

  constructor(protected override http: HttpClient) {
    super(http);
  }
}