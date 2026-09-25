import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { CuotaPoliza } from './cuota-poliza.model';

@Injectable({
  providedIn: 'root'
})
export class CuotaPolizaService extends BaseCrudService<CuotaPoliza> {
  protected endpoint = 'CuotaPoliza';

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
