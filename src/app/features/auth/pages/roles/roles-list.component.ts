import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RolesFormComponent } from './roles-form.component';
import { RoleModel } from '../../../../core/models/role.model';

@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [CommonModule, RolesFormComponent],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesListComponent {
  private readonly itemsSignal = signal<RoleModel[]>([
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Asistente' }
  ]);

  readonly page = signal(1);
  readonly pageSize = 3;
  readonly isModalOpen = signal(false);
  readonly selectedItem = signal<RoleModel | null>(null);
  readonly paginatedItems = signal<RoleModel[]>(this.itemsSignal().slice(0, this.pageSize));
  readonly totalPages = signal(Math.ceil(this.itemsSignal().length / this.pageSize));

  openModal() {
    this.selectedItem.set(null);
    this.isModalOpen.set(true);
  }

  edit(item: RoleModel) {
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

  onSaved(item: RoleModel) {
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