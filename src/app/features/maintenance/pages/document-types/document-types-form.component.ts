import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocumentType, DocumentTypeCreate, DocumentTypeUpdate } from '../../../../core/models/document-type.model';

@Component({
  selector: 'app-document-types-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './document-types-form.component.html',
  styleUrl: './document-types-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentTypesFormComponent implements OnChanges {
  @Input() item: DocumentType | null = null;
  @Output() saved = new EventEmitter<DocumentTypeCreate | DocumentTypeUpdate>();
  @Output() closed = new EventEmitter<void>();

  form: { nombre: string; descripcion: string; activo: boolean } = {
    nombre: '',
    descripcion: '',
    activo: true
  };

  ngOnChanges() {
    this.form = this.item
      ? { nombre: this.item.nombre, descripcion: this.item.descripcion ?? '', activo: this.item.activo }
      : { nombre: '', descripcion: '', activo: true };
  }

  save() {
    if (!this.form.nombre.trim()) {
      return;
    }

    if (this.item) {
      // Edición: se envía activo también (DocumentTypeUpdate)
      const payload: DocumentTypeUpdate = {
        nombre: this.form.nombre,
        descripcion: this.form.descripcion || null,
        activo: this.form.activo
      };
      this.saved.emit(payload);
    } else {
      // Creación: sin activo (lo asigna el backend por defecto)
      const payload: DocumentTypeCreate = {
        nombre: this.form.nombre,
        descripcion: this.form.descripcion || null
      };
      this.saved.emit(payload);
    }
  }

  close() {
    this.closed.emit();
  }
}
