import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SystemConfigFormComponent } from './system-config-form.component';
import { SystemConfigModel } from '../../../../core/models/system-config.model';

@Component({
  selector: 'app-system-config-list',
  standalone: true,
  imports: [CommonModule, SystemConfigFormComponent],
  templateUrl: './system-config-list.component.html',
  styleUrl: './system-config-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SystemConfigListComponent {
  private readonly itemsSignal = signal<SystemConfigModel[]>([
    { id: 1, clave: 'empresa.nombre', valor: 'AUPAD', descripcion: 'Nombre de la empresa' },
    { id: 2, clave: 'empresa.moneda', valor: 'Soles', descripcion: 'Moneda base' }
  ]);

  readonly page = signal(1);
  readonly pageSize = 3;
  readonly isModalOpen = signal(false);
  readonly selectedItem = signal<SystemConfigModel | null>(null);
  readonly paginatedItems = signal<SystemConfigModel[]>(this.itemsSignal().slice(0, this.pageSize));
  readonly totalPages = signal(Math.ceil(this.itemsSignal().length / this.pageSize));

  openModal() {
    this.selectedItem.set(null);
    this.isModalOpen.set(true);
  }

  edit(item: SystemConfigModel) {
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

  onSaved(item: SystemConfigModel) {
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