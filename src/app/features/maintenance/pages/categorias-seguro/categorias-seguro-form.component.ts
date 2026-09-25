import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriaSeguro } from './categoria-seguro.model';
import { CategoriaSeguroService } from './categoria-seguro.service';

@Component({
  selector: 'app-categorias-seguro-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias-seguro-form.component.html',
  styleUrl: './categorias-seguro-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriasSeguroFormComponent implements OnChanges {
  @Input() item: CategoriaSeguro | null = null;
  @Output() saved = new EventEmitter<CategoriaSeguro>();
  @Output() closed = new EventEmitter<void>();

  form: Partial<CategoriaSeguro> = { nombre: '', categoriaPadreId: null, activo: true };
  errorMessage: string | null = null;

  constructor(private categoriaSeguroService: CategoriaSeguroService, private cdr: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.form = this.item
      ? { ...this.item }
      : { nombre: '', categoriaPadreId: null, activo: true };
  }

  save(): void {
    if (!this.form.nombre?.trim()) {
      this.errorMessage = 'El nombre es obligatorio.';
      this.cdr.markForCheck();
      return;
    }

    this.errorMessage = null;

    if (this.form.id) {
      this.categoriaSeguroService.actualizar(this.form.id, this.form as CategoriaSeguro).subscribe({
        next: (categoria) => this.saved.emit(categoria),
        error: () => {
          this.errorMessage = 'No se pudo actualizar la categoría de seguro. Intenta nuevamente.';
          this.cdr.markForCheck();
        }
      });
    } else {
      this.categoriaSeguroService.crear(this.form as CategoriaSeguro).subscribe({
        next: (categoria) => this.saved.emit(categoria),
        error: () => {
          this.errorMessage = 'No se pudo crear la categoría de seguro. Intenta nuevamente.';
          this.cdr.markForCheck();
        }
      });
    }
  }

  close(): void {
    this.closed.emit();
  }
}
