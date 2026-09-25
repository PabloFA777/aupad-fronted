import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { SystemConfigModel } from './system-config.model';

@Injectable({
  providedIn: 'root'
})
export class SystemConfigService extends BaseCrudService<SystemConfigModel> {
  protected endpoint = 'ConfiguracionSistema';

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
