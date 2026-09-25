import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { PolizasFormComponent } from './polizas-form.component';
import { Poliza } from './poliza.model';
import { PolizaService } from './poliza.service';

@Component({
  selector: 'app-polizas-list',
  standalone: true,
  imports: [CommonModule, PolizasFormComponent],
  templateUrl: './polizas-list.component.html',
  styleUrl: './polizas-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolizasListComponent implements OnInit {
  private readonly itemsSignal = signal<Poliza[]>([]);

  constructor(private polizaService: PolizaService) {}

  ngOnInit(): void {
    this.cargarPolizas();
  }

  private cargarPolizas(): void {
    this.polizaService.obtenerTodos().subscribe(polizas => {
      this.itemsSignal.set(polizas);
      this.refreshPage();
    });
  }

  readonly page = signal(1);
  readonly pageSize = 3;
  readonly isModalOpen = signal(false);
  readonly selectedItem = signal<Poliza | null>(null);
  readonly paginatedItems = signal<Poliza[]>([]);
  readonly totalPages = signal(1);

  openModal() {
    this.selectedItem.set(null);
    this.isModalOpen.set(true);
  }

  edit(item: Poliza) {
    this.selectedItem.set(item);
    this.isModalOpen.set(true);
  }

  remove(id: number) {
    this.polizaService.eliminar(id).subscribe(() => {
      this.cargarPolizas();
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

  onSaved(item: Poliza) {
    this.cargarPolizas();
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
