import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { BeneficiarioPoliza } from './beneficiario-poliza.model';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioPolizaService extends BaseCrudService<BeneficiarioPoliza> {
  protected endpoint = 'BeneficiarioPoliza';

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
