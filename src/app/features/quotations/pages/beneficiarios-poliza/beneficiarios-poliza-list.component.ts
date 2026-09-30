import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { BeneficiariosPolizaFormComponent } from './beneficiarios-poliza-form.component';
import { BeneficiarioPoliza } from './beneficiario-poliza.model';
import { BeneficiarioPolizaService } from './beneficiario-poliza.service';

@Component({
  selector: 'app-beneficiarios-poliza-list',
  standalone: true,
  imports: [CommonModule, BeneficiariosPolizaFormComponent],
  templateUrl: './beneficiarios-poliza-list.component.html',
  styleUrl: './beneficiarios-poliza-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeneficiariosPolizasListComponent implements OnInit {
  private readonly itemsSignal = signal<BeneficiarioPoliza[]>([]);

  constructor(private beneficiarioPolizaService: BeneficiarioPolizaService) {}

  ngOnInit(): void {
    this.cargarBeneficiarios();
  }

  private cargarBeneficiarios(): void {
    this.beneficiarioPolizaService.obtenerTodos().subscribe(beneficiarios => {
      this.itemsSignal.set(beneficiarios);
      this.refreshPage();
    });
  }

  readonly page = signal(1);
  readonly pageSize = 3;
  readonly isModalOpen = signal(false);
  readonly selectedItem = signal<BeneficiarioPoliza | null>(null);
  readonly paginatedItems = signal<BeneficiarioPoliza[]>([]);
  readonly totalPages = signal(1);

  openModal() {
    this.selectedItem.set(null);
    this.isModalOpen.set(true);
  }

  edit(item: BeneficiarioPoliza) {
    this.selectedItem.set(item);
    this.isModalOpen.set(true);
  }

  remove(id: number) {
    this.beneficiarioPolizaService.eliminar(id).subscribe(() => {
      this.cargarBeneficiarios();
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

  onSaved(item: BeneficiarioPoliza) {
    this.cargarBeneficiarios();
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
