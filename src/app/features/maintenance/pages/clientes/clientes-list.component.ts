import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ClientesFormComponent } from './clientes-form.component';
import { Cliente } from './cliente.model';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [CommonModule, ClientesFormComponent],
  templateUrl: './clientes-list.component.html',
  styleUrl: './clientes-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientesListComponent implements OnInit {
  private readonly itemsSignal = signal<Cliente[]>([]);

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  private cargarClientes(): void {
    this.clienteService.obtenerTodos().subscribe(clientes => {
      this.itemsSignal.set(clientes);
      this.refreshPage();
    });
  }

  readonly page = signal(1);
  readonly pageSize = 3;
  readonly isModalOpen = signal(false);
  readonly selectedItem = signal<Cliente | null>(null);
  readonly paginatedItems = signal<Cliente[]>([]);
  readonly totalPages = signal(1);

  openModal() {
    this.selectedItem.set(null);
    this.isModalOpen.set(true);
  }

  edit(item: Cliente) {
    this.selectedItem.set(item);
    this.isModalOpen.set(true);
  }

  remove(id: number) {
    this.clienteService.eliminar(id).subscribe(() => {
      this.cargarClientes();
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

  onSaved(item: Cliente) {
    this.cargarClientes();
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
