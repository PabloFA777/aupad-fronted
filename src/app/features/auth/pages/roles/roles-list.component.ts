import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RolesFormComponent } from './roles-form.component';
import { Rol } from './rol.model';
import { RolService } from './rol.service';

@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [CommonModule, RolesFormComponent],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesListComponent implements OnInit {
  private readonly itemsSignal = signal<Rol[]>([]);

constructor(private rolService: RolService) {}

ngOnInit(): void {
  this.cargarRoles();
}

private cargarRoles(): void {
  this.rolService.obtenerTodos().subscribe(roles => {
    this.itemsSignal.set(roles);
    this.refreshPage();
  });
}
  readonly page = signal(1);
  readonly pageSize = 3;
  readonly isModalOpen = signal(false);
  readonly selectedItem = signal<Rol | null>(null);
  readonly paginatedItems = signal<Rol[]>(this.itemsSignal().slice(0, this.pageSize));
  readonly totalPages = signal(Math.ceil(this.itemsSignal().length / this.pageSize));

  openModal() {
    this.selectedItem.set(null);
    this.isModalOpen.set(true);
  }

  edit(item: Rol) {
  this.selectedItem.set(item);
  this.isModalOpen.set(true);
  }

  remove(id: number) {
    this.rolService.eliminar(id).subscribe(() => {
      this.cargarRoles();
    });
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

  onSaved(item: Rol) {
    this.cargarRoles();
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