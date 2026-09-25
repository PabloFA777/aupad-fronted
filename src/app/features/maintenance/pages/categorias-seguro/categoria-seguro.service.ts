import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { CategoriaSeguro } from './categoria-seguro.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaSeguroService extends BaseCrudService<CategoriaSeguro> {
  protected endpoint = 'CategoriaSeguro';

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
