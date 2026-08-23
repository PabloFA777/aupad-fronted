import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rol } from './rol.model';
import { RolService } from './rol.service';

@Component({
  selector: 'app-roles-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roles-form.component.html',
  styleUrl: './roles-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesFormComponent implements OnChanges {
  @Input() item: Rol | null = null;
  @Output() saved = new EventEmitter<Rol>();
  @Output() closed = new EventEmitter<void>();

  form: Partial<Rol> = { nombre: '', descripcion: '', activo: true };

  constructor(private rolService: RolService) {}

  ngOnChanges() {
    this.form = this.item
      ? { ...this.item }
      : { nombre: '', descripcion: '', activo: true };
  }

  save() {
    if (!this.form.nombre?.trim()) {
      return;
    }

    if (this.form.id) {
      this.rolService.actualizar(this.form.id, this.form as Rol).subscribe(rol => {
        this.saved.emit(rol);
      });
    } else {
      this.rolService.crear(this.form as Rol).subscribe(rol => {
        this.saved.emit(rol);
      });
    }
  }

  close() {
    this.closed.emit();
  }
}