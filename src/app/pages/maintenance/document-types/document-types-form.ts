import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface DocumentTypeItem {
  id: number;
  code: string;
  description: string;
  status: 'Activo' | 'Inactivo';
}

@Component({
  selector: 'app-document-types-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-backdrop" (click)="close()">
      <div class="modal-card" (click)="$event.stopPropagation()">
        <div class="modal-card__header">
          <h4>{{ item ? 'Editar tipo de documento' : 'Agregar tipo de documento' }}</h4>
          <button class="btn-close" type="button" (click)="close()"></button>
        </div>

        <form class="row g-3" (ngSubmit)="save()">
          <div class="col-md-6">
            <label class="form-label">Código</label>
            <input class="form-control" [(ngModel)]="form.code" name="code" required />
          </div>
          <div class="col-md-6">
            <label class="form-label">Estado</label>
            <select class="form-select" [(ngModel)]="form.status" name="status">
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <div class="col-12">
            <label class="form-label">Descripción</label>
            <textarea class="form-control" rows="3" [(ngModel)]="form.description" name="description" required></textarea>
          </div>

          <div class="col-12 d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-secondary" (click)="close()">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-backdrop { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.45); display: grid; place-items: center; z-index: 1000; }
      .modal-card { width: min(560px, 92vw); background: #fff; border-radius: 16px; padding: 20px; box-shadow: 0 16px 40px rgba(15, 23, 42, 0.18); }
      .modal-card__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
      .btn-close { border: none; background: transparent; font-size: 1.1rem; }
    `
  ]
})
export class DocumentTypesFormComponent {
  @Input() item: DocumentTypeItem | null = null;
  @Output() saved = new EventEmitter<DocumentTypeItem>();
  @Output() closed = new EventEmitter<void>();

  form: DocumentTypeItem = {
    id: 0,
    code: '',
    description: '',
    status: 'Activo'
  };

  ngOnChanges() {
    this.form = this.item ? { ...this.item } : { id: 0, code: '', description: '', status: 'Activo' };
  }

  save() {
    const current = this.form;
    if (!current.code.trim() || !current.description.trim()) {
      return;
    }
    this.saved.emit({ ...current, id: current.id || Date.now() });
  }

  close() {
    this.closed.emit();
  }
}
