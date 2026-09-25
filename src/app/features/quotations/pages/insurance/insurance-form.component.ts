import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InsuranceModel } from './insurance.model';
import { InsuranceService } from './insurance.service';

@Component({
  selector: 'app-insurance-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './insurance-form.component.html',
  styleUrl: './insurance-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InsuranceFormComponent implements OnChanges {
  @Input() item: InsuranceModel | null = null;
  @Output() saved = new EventEmitter<InsuranceModel>();
  @Output() closed = new EventEmitter<void>();

  form: Partial<InsuranceModel> = { categoriaId: 1, codigo: '', nombre: '', descripcion: '', activo: true };
  errorMessage: string | null = null;

  constructor(private insuranceService: InsuranceService, private cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    this.form = this.item
      ? { ...this.item }
      : { categoriaId: 1, codigo: '', nombre: '', descripcion: '', activo: true };
  }

  save() {
    if (!this.form.codigo?.trim() || !this.form.nombre?.trim()) {
      this.errorMessage = 'El código y el nombre son obligatorios.';
      this.cdr.markForCheck();
      return;
    }

    this.errorMessage = null;

    if (this.form.id) {
      this.insuranceService.actualizar(this.form.id, this.form as InsuranceModel).subscribe({
        next: (res) => this.saved.emit(res),
        error: (err) => {
          this.errorMessage = 'No se pudo actualizar el seguro. Intenta nuevamente.';
          this.cdr.markForCheck();
        }
      });
    } else {
      this.insuranceService.crear(this.form as InsuranceModel).subscribe({
        next: (res) => this.saved.emit(res),
        error: (err) => {
          this.errorMessage = 'No se pudo crear el seguro. Intenta nuevamente.';
          this.cdr.markForCheck();
        }
      });
    }
  }

  close() {
    this.closed.emit();
  }
}
