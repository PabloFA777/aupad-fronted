import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { Poliza } from './poliza.model';

@Injectable({
  providedIn: 'root'
})
export class PolizaService extends BaseCrudService<Poliza> {
  protected endpoint = 'Poliza';

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
