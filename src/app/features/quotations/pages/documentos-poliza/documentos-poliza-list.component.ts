import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { DocumentosPolizaFormComponent } from './documentos-poliza-form.component';
import { DocumentoPoliza } from './documento-poliza.model';
import { DocumentoPolizaService } from './documento-poliza.service';

@Component({
  selector: 'app-documentos-poliza-list',
  standalone: true,
  imports: [CommonModule, DocumentosPolizaFormComponent],
  templateUrl: './documentos-poliza-list.component.html',
  styleUrl: './documentos-poliza-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentosPolizasListComponent implements OnInit {
  private readonly itemsSignal = signal<DocumentoPoliza[]>([]);

  constructor(private documentoPolizaService: DocumentoPolizaService) {}

  ngOnInit(): void {
    this.cargarDocumentos();
  }

  private cargarDocumentos(): void {
    this.documentoPolizaService.obtenerTodos().subscribe(docs => {
      this.itemsSignal.set(docs);
      this.refreshPage();
    });
  }

  readonly page = signal(1);
  readonly pageSize = 3;
  readonly isModalOpen = signal(false);
  readonly selectedItem = signal<DocumentoPoliza | null>(null);
  readonly paginatedItems = signal<DocumentoPoliza[]>([]);
  readonly totalPages = signal(1);

  openModal() {
    this.selectedItem.set(null);
    this.isModalOpen.set(true);
  }

  edit(item: DocumentoPoliza) {
    this.selectedItem.set(item);
    this.isModalOpen.set(true);
  }

  remove(id: number) {
    this.documentoPolizaService.eliminar(id).subscribe(() => {
      this.cargarDocumentos();
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

  onSaved(item: DocumentoPoliza) {
    this.cargarDocumentos();
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
