import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EstadoUsuario, Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuarios-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios-form.component.html',
  styleUrl: './usuarios-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuariosFormComponent implements OnChanges {
  @Input() item: Usuario | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  errorMessage: string | null = null;

  form: Usuario = this.formVacio();

  constructor(private usuarioService: UsuarioService) {}

  ngOnChanges() {
    this.form = this.item ? { ...this.item } : this.formVacio();
    this.errorMessage = null;
  }

  save() {
    const current = this.form;
    if (!current.nombre.trim() || !current.apellido.trim() || !current.correo.trim()) {
      return;
    }

    this.errorMessage = null;

    const peticion = current.id
      ? this.usuarioService.actualizar(current.id, current)
      : this.usuarioService.crear(current);

    peticion.subscribe({
      next: () => this.saved.emit(),
      error: (err) => {
        console.error('Error al guardar usuario', err);
        this.errorMessage = 'No se pudo guardar el usuario. Verifica los datos e intenta de nuevo.';
      }
    });
  }

  close() {
    this.closed.emit();
  }

  private formVacio(): Usuario {
    return {
      id: 0,
      rolId: 1,
      nombre: '',
      apellido: '',
      correo: '',
      estado: EstadoUsuario.Activo,
      ingresoConfirmado: false,
      requiereCambioPassword: false
    };
  }
}