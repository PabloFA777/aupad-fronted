import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CuotasPolizaFormComponent } from './cuotas-poliza-form.component';
import { CuotaPoliza } from './cuota-poliza.model';
import { CuotaPolizaService } from './cuota-poliza.service';

@Component({
  selector: 'app-cuotas-poliza-list',
  standalone: true,
  imports: [CommonModule, CuotasPolizaFormComponent],
  templateUrl: './cuotas-poliza-list.component.html',
  styleUrl: './cuotas-poliza-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CuotasPolizasListComponent implements OnInit {
  private readonly itemsSignal = signal<CuotaPoliza[]>([]);

  constructor(private cuotaPolizaService: CuotaPolizaService) {}

  ngOnInit(): void {
    this.cargarCuotas();
  }

  private cargarCuotas(): void {
    this.cuotaPolizaService.obtenerTodos().subscribe(cuotas => {
      this.itemsSignal.set(cuotas);
      this.refreshPage();
    });
  }

  readonly page = signal(1);
  readonly pageSize = 3;
  readonly isModalOpen = signal(false);
  readonly selectedItem = signal<CuotaPoliza | null>(null);
  readonly paginatedItems = signal<CuotaPoliza[]>([]);
  readonly totalPages = signal(1);

  openModal() {
    this.selectedItem.set(null);
    this.isModalOpen.set(true);
  }

  edit(item: CuotaPoliza) {
    this.selectedItem.set(item);
    this.isModalOpen.set(true);
  }

  remove(id: number) {
    this.cuotaPolizaService.eliminar(id).subscribe(() => {
      this.cargarCuotas();
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

  onSaved(item: CuotaPoliza) {
    this.cargarCuotas();
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
