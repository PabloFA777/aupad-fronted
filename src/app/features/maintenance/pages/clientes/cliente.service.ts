import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { Cliente } from './cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseCrudService<Cliente> {
  protected endpoint = 'Cliente';

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
