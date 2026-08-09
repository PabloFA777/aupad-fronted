import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DocumentTypesFormComponent } from './document-types-form.component';
import { DocumentTypeModel } from '../../../../core/models/document-type.model';

@Component({
  selector: 'app-document-types-list',
  standalone: true,
  imports: [CommonModule, DocumentTypesFormComponent],
  templateUrl: './document-types-list.component.html',
  styleUrl: './document-types-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentTypesListComponent {
  private readonly itemsSignal = signal<DocumentTypeModel[]>([
    { id: 1, code: 'DNI', description: 'Documento Nacional de Identidad', status: 'Activo' },
    { id: 2, code: 'CE', description: 'Carnet de Extranjería', status: 'Activo' },
    { id: 3, code: 'PAS', description: 'Pasaporte', status: 'Inactivo' },
    { id: 4, code: 'RUC', description: 'Registro Único de Contribuyentes', status: 'Activo' }
  ]);

  readonly page = signal(1);
  readonly pageSize = 3;
  readonly isModalOpen = signal(false);
  readonly selectedItem = signal<DocumentTypeModel | null>(null);
  readonly paginatedItems = signal<DocumentTypeModel[]>(this.itemsSignal().slice(0, this.pageSize));
  readonly totalPages = signal(Math.ceil(this.itemsSignal().length / this.pageSize));

  openModal() {
    this.selectedItem.set(null);
    this.isModalOpen.set(true);
  }

  edit(item: DocumentTypeModel) {
    this.selectedItem.set(item);
    this.isModalOpen.set(true);
  }

  remove(id: number) {
    this.itemsSignal.update(items => items.filter(item => item.id !== id));
    this.refreshPage();
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update(value => value - 1);
      this.refreshPage();
    }
  }

  nextPage() {
    if (this.page() < this.totalPages()) {
      this.page.update(value => value + 1);
      this.refreshPage();
    }
  }

  onSaved(item: DocumentTypeModel) {
    const current = this.itemsSignal();
    const exists = current.some(entry => entry.id === item.id);
    if (exists) {
      this.itemsSignal.update(items => items.map(entry => entry.id === item.id ? item : entry));
    } else {
      this.itemsSignal.update(items => [{ ...item, id: Date.now() }, ...items]);
    }
    this.refreshPage();
    this.closeModal();
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedItem.set(null);
  }

  private refreshPage() {
    const start = (this.page() - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedItems.set(this.itemsSignal().slice(start, end));
    this.totalPages.set(Math.max(1, Math.ceil(this.itemsSignal().length / this.pageSize)));
  }
}
