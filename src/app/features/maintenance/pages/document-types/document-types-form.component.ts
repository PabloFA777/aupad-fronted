import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocumentTypeModel } from '../../../../core/models/document-type.model';

@Component({
  selector: 'app-document-types-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './document-types-form.component.html',
  styleUrl: './document-types-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentTypesFormComponent {
  @Input() item: DocumentTypeModel | null = null;
  @Output() saved = new EventEmitter<DocumentTypeModel>();
  @Output() closed = new EventEmitter<void>();

  form: DocumentTypeModel = {
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
