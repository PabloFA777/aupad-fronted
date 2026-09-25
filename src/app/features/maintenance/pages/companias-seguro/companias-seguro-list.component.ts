import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CompaniasSeguroFormComponent } from './companias-seguro-form.component';
import { CompaniaSeguro } from './compania-seguro.model';
import { CompaniaSeguroService } from './compania-seguro.service';

@Component({
  selector: 'app-companias-seguro-list',
  standalone: true,
  imports: [CommonModule, CompaniasSeguroFormComponent],
  templateUrl: './companias-seguro-list.component.html',
  styleUrl: './companias-seguro-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniasSeguroListComponent implements OnInit {
  private readonly itemsSignal = signal<CompaniaSeguro[]>([]);

  constructor(private companiaSeguroService: CompaniaSeguroService) {}

  ngOnInit(): void {
    this.cargarCompaniasSeguro();
  }

  private cargarCompaniasSeguro(): void {
    this.companiaSeguroService.obtenerTodos().subscribe(companias => {
      this.itemsSignal.set(companias);
      this.refreshPage();
    });
  }

  readonly page = signal(1);
  readonly pageSize = 3;
  readonly isModalOpen = signal(false);
  readonly selectedItem = signal<CompaniaSeguro | null>(null);
  readonly paginatedItems = signal<CompaniaSeguro[]>(this.itemsSignal().slice(0, this.pageSize));
  readonly totalPages = signal(Math.ceil(this.itemsSignal().length / this.pageSize));

  openModal(): void {
    this.selectedItem.set(null);
    this.isModalOpen.set(true);
  }

  edit(item: CompaniaSeguro): void {
    this.selectedItem.set(item);
    this.isModalOpen.set(true);
  }

  remove(id: number): void {
    this.companiaSeguroService.eliminar(id).subscribe(() => {
      this.cargarCompaniasSeguro();
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

  onSaved(item: CompaniaSeguro): void {
    this.cargarCompaniasSeguro();
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
