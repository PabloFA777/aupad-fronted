import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
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
  errorMessage: string | null = null;

constructor(private rolService: RolService, private cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    this.form = this.item
      ? { ...this.item }
      : { nombre: '', descripcion: '', activo: true };
  }

     save() {
     if (!this.form.nombre?.trim()) {
      this.errorMessage = 'El nombre es obligatorio.';
      this.cdr.markForCheck();
      return;
    }

    this.errorMessage = null;

    if (this.form.id) {
      this.rolService.actualizar(this.form.id, this.form as Rol).subscribe({
        next: (rol) => this.saved.emit(rol),
        error: (err) => {
          this.errorMessage = 'No se pudo actualizar el rol. Intenta nuevamente.';
          this.cdr.markForCheck();
        }
      });
    } else {
      this.rolService.crear(this.form as Rol).subscribe({
        next: (rol) => this.saved.emit(rol),
        error: (err) => {
          this.errorMessage = 'No se pudo crear el rol. Intenta nuevamente.';
          this.cdr.markForCheck();
        }
      });
    }
  }

    close() {
    this.closed.emit();
  }
}