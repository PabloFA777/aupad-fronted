import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { InsuranceModel } from './insurance.model';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService extends BaseCrudService<InsuranceModel> {
  protected endpoint = 'Seguro';

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
