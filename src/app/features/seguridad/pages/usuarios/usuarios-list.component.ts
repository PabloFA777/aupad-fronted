import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { UsuariosFormComponent } from './usuarios-form.component';
import { UserModel } from '../../../../core/models/user.model';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule, UsuariosFormComponent],
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuariosListComponent {
  private readonly itemsSignal = signal<UserModel[]>([
    { id: 1, rolId: 1, nombre: 'Carlos', apellido: 'Pérez', correo: 'carlos@aupad.com', estado: 'activo', ingresoConfirmado: true, requiereCambioPassword: false },
    { id: 2, rolId: 2, nombre: 'Ana', apellido: 'García', correo: 'ana@aupad.com', estado: 'inactivo', ingresoConfirmado: false, requiereCambioPassword: true }
  ]);

  readonly page = signal(1);
  readonly pageSize = 3;
  readonly isModalOpen = signal(false);
  readonly selectedItem = signal<UserModel | null>(null);
  readonly paginatedItems = signal<UserModel[]>(this.itemsSignal().slice(0, this.pageSize));
  readonly totalPages = signal(Math.ceil(this.itemsSignal().length / this.pageSize));

  openModal() {
    this.selectedItem.set(null);
    this.isModalOpen.set(true);
  }

  edit(item: UserModel) {
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

  onSaved(item: UserModel) {
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