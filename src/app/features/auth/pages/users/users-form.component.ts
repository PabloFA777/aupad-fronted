import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../../../core/models/user.model';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersFormComponent {
  @Input() item: UserModel | null = null;
  @Output() saved = new EventEmitter<UserModel>();
  @Output() closed = new EventEmitter<void>();

  form: UserModel = {
    id: 0,
    rolId: 1,
    nombre: '',
    apellido: '',
    correo: '',
    estado: 'activo',
    ingresoConfirmado: false,
    requiereCambioPassword: false
  };

  ngOnChanges() {
    this.form = this.item
      ? { ...this.item }
      : {
          id: 0,
          rolId: 1,
          nombre: '',
          apellido: '',
          correo: '',
          estado: 'activo',
          ingresoConfirmado: false,
          requiereCambioPassword: false
        };
  }

  save() {
    const current = this.form;
    if (!current.nombre.trim() || !current.apellido.trim() || !current.correo.trim()) {
      return;
    }

    this.saved.emit({ ...current, id: current.id || Date.now() });
  }

  close() {
    this.closed.emit();
  }
}
