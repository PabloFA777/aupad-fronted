import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { SystemConfigFormComponent } from './system-config-form.component';
import { SystemConfigModel } from './system-config.model';
import { SystemConfigService } from './system-config.service';

@Component({
  selector: 'app-system-config-list',
  standalone: true,
  imports: [CommonModule, SystemConfigFormComponent],
  templateUrl: './system-config-list.component.html',
  styleUrl: './system-config-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SystemConfigListComponent implements OnInit {
  private readonly itemsSignal = signal<SystemConfigModel[]>([]);

  constructor(private systemConfigService: SystemConfigService) {}

  ngOnInit(): void {
    this.cargarConfiguraciones();
  }

  private cargarConfiguraciones(): void {
    this.systemConfigService.obtenerTodos().subscribe(configuraciones => {
      this.itemsSignal.set(configuraciones);
      this.refreshPage();
    });
  }

  readonly page = signal(1);
  readonly pageSize = 3;
  readonly isModalOpen = signal(false);
  readonly selectedItem = signal<SystemConfigModel | null>(null);
  readonly paginatedItems = signal<SystemConfigModel[]>([]);
  readonly totalPages = signal(1);

  openModal() {
    this.selectedItem.set(null);
    this.isModalOpen.set(true);
  }

  edit(item: SystemConfigModel) {
    this.selectedItem.set(item);
    this.isModalOpen.set(true);
  }

  remove(id: number) {
    this.systemConfigService.eliminar(id).subscribe(() => {
      this.cargarConfiguraciones();
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

  onSaved(item: SystemConfigModel) {
    this.cargarConfiguraciones();
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