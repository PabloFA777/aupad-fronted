import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { InsuranceFormComponent } from './insurance-form.component';
import { InsuranceModel } from '../../../../core/models/insurance.model';

@Component({
  selector: 'app-insurance-list',
  standalone: true,
  imports: [CommonModule, InsuranceFormComponent],
  templateUrl: './insurance-list.component.html',
  styleUrl: './insurance-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InsuranceListComponent {
  private readonly itemsSignal = signal<InsuranceModel[]>([
    { id: 1, categoriaId: 1, codigo: 'VIDA', nombre: 'Seguro de Vida', descripcion: 'Cobertura integral de vida', activo: true },
    { id: 2, categoriaId: 2, codigo: 'AUTO', nombre: 'Seguro Automotriz', descripcion: 'Protección vehicular', activo: true },
    { id: 3, categoriaId: 3, codigo: 'SALUD', nombre: 'Seguro de Salud', descripcion: 'Atención médica', activo: false },
    { id: 4, categoriaId: 4, codigo: 'HOGAR', nombre: 'Seguro de Hogar', descripcion: 'Protección del inmueble', activo: true }
  ]);

  readonly page = signal(1);
  readonly pageSize = 3;
  readonly isModalOpen = signal(false);
  readonly selectedItem = signal<InsuranceModel | null>(null);
  readonly paginatedItems = signal<InsuranceModel[]>(this.itemsSignal().slice(0, this.pageSize));
  readonly totalPages = signal(Math.ceil(this.itemsSignal().length / this.pageSize));

  openModal() {
    this.selectedItem.set(null);
    this.isModalOpen.set(true);
  }

  edit(item: InsuranceModel) {
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

  onSaved(item: InsuranceModel) {
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
