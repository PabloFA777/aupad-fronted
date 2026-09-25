import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompaniaSeguro } from './compania-seguro.model';
import { CompaniaSeguroService } from './compania-seguro.service';

@Component({
  selector: 'app-companias-seguro-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './companias-seguro-form.component.html',
  styleUrl: './companias-seguro-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniasSeguroFormComponent implements OnChanges {
  @Input() item: CompaniaSeguro | null = null;
  @Output() saved = new EventEmitter<CompaniaSeguro>();
  @Output() closed = new EventEmitter<void>();

  form: Partial<CompaniaSeguro> = {
    nombre: '',
    ruc: '',
    telefono: '',
    correo: '',
    direccion: '',
    paginaWeb: '',
    contactoComercial: '',
    activo: true
  };
  errorMessage: string | null = null;

  constructor(private companiaSeguroService: CompaniaSeguroService, private cdr: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.form = this.item
      ? { ...this.item }
      : {
          nombre: '',
          ruc: '',
          telefono: '',
          correo: '',
          direccion: '',
          paginaWeb: '',
          contactoComercial: '',
          activo: true
        };
  }

  save(): void {
    if (!this.form.nombre?.trim()) {
      this.errorMessage = 'El nombre es obligatorio.';
      this.cdr.markForCheck();
      return;
    }

    this.errorMessage = null;

    if (this.form.id) {
      this.companiaSeguroService.actualizar(this.form.id, this.form as CompaniaSeguro).subscribe({
        next: (compania) => this.saved.emit(compania),
        error: () => {
          this.errorMessage = 'No se pudo actualizar la compañía de seguro. Intenta nuevamente.';
          this.cdr.markForCheck();
        }
      });
    } else {
      this.companiaSeguroService.crear(this.form as CompaniaSeguro).subscribe({
        next: (compania) => this.saved.emit(compania),
        error: () => {
          this.errorMessage = 'No se pudo crear la compañía de seguro. Intenta nuevamente.';
          this.cdr.markForCheck();
        }
      });
    }
  }

  close(): void {
    this.closed.emit();
  }
}
