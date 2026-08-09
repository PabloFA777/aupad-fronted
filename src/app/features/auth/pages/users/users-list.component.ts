import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { UserModel } from '../../../../core/models/user.model';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
  readonly users = signal<UserModel[]>([
    { id: 1, rolId: 1, nombre: 'Carlos', apellido: 'Pérez', correo: 'carlos@aupad.com', estado: 'activo', ingresoConfirmado: true, requiereCambioPassword: false },
    { id: 2, rolId: 2, nombre: 'Ana', apellido: 'García', correo: 'ana@aupad.com', estado: 'inactivo', ingresoConfirmado: false, requiereCambioPassword: true }
  ]);
}
