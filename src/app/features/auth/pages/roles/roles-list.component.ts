import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RoleModel } from '../../../../core/models/role.model';

@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesListComponent {
  readonly roles = signal<RoleModel[]>([
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Asistente' }
  ]);
}
