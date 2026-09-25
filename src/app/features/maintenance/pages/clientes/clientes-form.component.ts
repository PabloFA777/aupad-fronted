import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente, TipoCliente, TipoDocumentoCliente } from './cliente.model';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes-form.component.html',
  styleUrl: './clientes-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientesFormComponent implements OnChanges {
  @Input() item: Cliente | null = null;
  @Output() saved = new EventEmitter<Cliente>();
  @Output() closed = new EventEmitter<void>();

  form: Partial<Cliente> = {
    tipoCliente: 'natural',
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    nombreRazonSocial: '',
    correo: '',
    telefono: '',
    direccion: '',
    observaciones: '',
    usuarioId: 1,
    activo: true
  };
  errorMessage: string | null = null;

  readonly tiposClienteOptions: { label: string; value: TipoCliente }[] = [
    { label: 'Persona Natural', value: 'natural' },
    { label: 'Persona Jurídica', value: 'juridica' }
  ];

  readonly tiposDocumentoOptions: { label: string; value: TipoDocumentoCliente }[] = [
    { label: 'DNI', value: 'DNI' },
    { label: 'RUC', value: 'RUC' },
    { label: 'Pasaporte', value: 'PASAPORTE' },
    { label: 'Carnet de Extranjería (CE)', value: 'CE' }
  ];

  constructor(private clienteService: ClienteService, private cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    this.form = this.item
      ? { ...this.item }
      : {
          tipoCliente: 'natural',
          tipoDocumento: 'DNI',
          numeroDocumento: '',
          nombreRazonSocial: '',
          correo: '',
          telefono: '',
          direccion: '',
          observaciones: '',
          usuarioId: 1,
          activo: true
        };
  }

  save() {
    if (!this.form.nombreRazonSocial?.trim() || !this.form.numeroDocumento?.trim()) {
      this.errorMessage = 'El nombre/razón social y el número de documento son obligatorios.';
      this.cdr.markForCheck();
      return;
    }

    this.errorMessage = null;

    if (this.form.id) {
      this.clienteService.actualizar(this.form.id, this.form as Cliente).subscribe({
        next: (res) => this.saved.emit(res),
        error: (err) => {
          this.errorMessage = 'No se pudo actualizar el cliente. Intenta nuevamente.';
          this.cdr.markForCheck();
        }
      });
    } else {
      this.clienteService.crear(this.form as Cliente).subscribe({
        next: (res) => this.saved.emit(res),
        error: (err) => {
          this.errorMessage = 'No se pudo crear el cliente. Intenta nuevamente.';
          this.cdr.markForCheck();
        }
      });
    }
  }

  close() {
    this.closed.emit();
  }
}
