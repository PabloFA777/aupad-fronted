import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { DocumentoPoliza } from './documento-poliza.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentoPolizaService extends BaseCrudService<DocumentoPoliza> {
  protected endpoint = 'DocumentoPoliza';

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
