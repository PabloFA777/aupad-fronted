import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SystemConfigModel } from '../../../../core/models/system-config.model';

@Component({
  selector: 'app-system-config-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-config-list.component.html',
  styleUrl: './system-config-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SystemConfigListComponent {
  readonly configs = signal<SystemConfigModel[]>([
    { id: 1, clave: 'empresa.nombre', valor: 'AUPAD', descripcion: 'Nombre de la empresa' },
    { id: 2, clave: 'empresa.moneda', valor: 'Soles', descripcion: 'Moneda base' }
  ]);
}
