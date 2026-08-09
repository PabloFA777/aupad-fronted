import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InsuranceModel } from '../../../../core/models/insurance.model';

@Component({
  selector: 'app-insurance-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './insurance-form.component.html',
  styleUrl: './insurance-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InsuranceFormComponent {
  @Input() item: InsuranceModel | null = null;
  @Output() saved = new EventEmitter<InsuranceModel>();
  @Output() closed = new EventEmitter<void>();

  form: InsuranceModel = {
    id: 0,
    categoriaId: 0,
    codigo: '',
    nombre: '',
    descripcion: '',
    activo: true,
    usuarioCreoId: null,
    usuarioActualizoId: null
  };

  ngOnChanges() {
    this.form = this.item ? { ...this.item } : { id: 0, categoriaId: 0, codigo: '', nombre: '', descripcion: '', activo: true, usuarioCreoId: null, usuarioActualizoId: null };
  }

  save() {
    const current = this.form;
    if (!current.codigo.trim() || !current.nombre.trim() || !current.descripcion.trim()) {
      return;
    }
    this.saved.emit({ ...current, id: current.id || Date.now() });
  }

  close() {
    this.closed.emit();
  }
}
