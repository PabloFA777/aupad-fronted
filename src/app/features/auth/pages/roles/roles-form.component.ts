import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoleModel } from '../../../../core/models/role.model';

@Component({
  selector: 'app-roles-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roles-form.component.html',
  styleUrl: './roles-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesFormComponent {
  @Input() item: RoleModel | null = null;
  @Output() saved = new EventEmitter<RoleModel>();
  @Output() closed = new EventEmitter<void>();

  form: RoleModel = { id: 0, nombre: '' };

  ngOnChanges() {
    this.form = this.item ? { ...this.item } : { id: 0, nombre: '' };
  }

  save() {
    if (!this.form.nombre.trim()) {
      return;
    }

    this.saved.emit({ ...this.form, id: this.form.id || Date.now() });
  }

  close() {
    this.closed.emit();
  }
}
