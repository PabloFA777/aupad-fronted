import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CategoriasSeguroFormComponent } from './categorias-seguro-form.component';
import { CategoriaSeguro } from './categoria-seguro.model';
import { CategoriaSeguroService } from './categoria-seguro.service';

@Component({
  selector: 'app-categorias-seguro-list',
  standalone: true,
  imports: [CommonModule, CategoriasSeguroFormComponent],
  templateUrl: './categorias-seguro-list.component.html',
  styleUrl: './categorias-seguro-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriasSeguroListComponent implements OnInit {
  private readonly itemsSignal = signal<CategoriaSeguro[]>([]);

  constructor(private categoriaSeguroService: CategoriaSeguroService) {}

  ngOnInit(): void {
    this.cargarCategoriasSeguro();
  }

  private cargarCategoriasSeguro(): void {
    this.categoriaSeguroService.obtenerTodos().subscribe(categorias => {
      this.itemsSignal.set(categorias);
      this.refreshPage();
    });
  }

  readonly page = signal(1);
  readonly pageSize = 3;
  readonly isModalOpen = signal(false);
  readonly selectedItem = signal<CategoriaSeguro | null>(null);
  readonly paginatedItems = signal<CategoriaSeguro[]>(this.itemsSignal().slice(0, this.pageSize));
  readonly totalPages = signal(Math.ceil(this.itemsSignal().length / this.pageSize));

  openModal(): void {
    this.selectedItem.set(null);
    this.isModalOpen.set(true);
  }

  edit(item: CategoriaSeguro): void {
    this.selectedItem.set(item);
    this.isModalOpen.set(true);
  }

  remove(id: number): void {
    this.categoriaSeguroService.eliminar(id).subscribe(() => {
      this.cargarCategoriasSeguro();
    });
  }

  prevPage(): void {
    if (this.page() > 1) {
      this.page.update(value => value - 1);
      this.refreshPage();
    }
  }

  nextPage(): void {
    if (this.page() < this.totalPages()) {
      this.page.update(value => value + 1);
      this.refreshPage();
    }
  }

  onSaved(item: CategoriaSeguro): void {
    this.cargarCategoriasSeguro();
    this.closeModal();
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedItem.set(null);
  }

  private refreshPage(): void {
    const start = (this.page() - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedItems.set(this.itemsSignal().slice(start, end));
    this.totalPages.set(Math.max(1, Math.ceil(this.itemsSignal().length / this.pageSize)));
  }
}
