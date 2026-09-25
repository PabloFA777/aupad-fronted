import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { CompaniaSeguro } from './compania-seguro.model';

@Injectable({
  providedIn: 'root'
})
export class CompaniaSeguroService extends BaseCrudService<CompaniaSeguro> {
  protected endpoint = 'CompaniaSeguro';

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
