import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { DocumentTypesFormComponent } from './document-types-form.component';
import { DocumentType, DocumentTypeCreate, DocumentTypeUpdate } from '../../../../core/models/document-type.model';
import { TipoDocumentoService } from '../../../../core/services/tipo-documento.service';

@Component({
  selector: 'app-document-types-list',
  standalone: true,
  imports: [CommonModule, DocumentTypesFormComponent],
  templateUrl: './document-types-list.component.html',
  styleUrl: './document-types-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentTypesListComponent implements OnInit {
  private readonly itemsSignal = signal<DocumentType[]>([]);

  readonly page = signal(1);
  readonly pageSize = 3;
  readonly isModalOpen = signal(false);
  readonly selectedItem = signal<DocumentType | null>(null);
  readonly paginatedItems = signal<DocumentType[]>([]);
  readonly totalPages = signal(1);
  readonly loading = signal(false);
  readonly errorMsg = signal<string | null>(null);

  constructor(private readonly tipoDocumentoService: TipoDocumentoService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.loading.set(true);
    this.errorMsg.set(null);
    this.tipoDocumentoService.obtenerTodos().subscribe({
      next: (data) => {
        this.itemsSignal.set(data);
        this.page.set(1);
        this.refreshPage();
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar tipos de documento', err);
        this.errorMsg.set('No se pudo cargar la lista. Verifica que el backend esté corriendo.');
        this.loading.set(false);
      }
    });
  }

  openModal() {
    this.selectedItem.set(null);
    this.isModalOpen.set(true);
  }

  edit(item: DocumentType) {
    this.selectedItem.set(item);
    this.isModalOpen.set(true);
  }

  remove(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este tipo de documento?')) {
      return;
    }
    this.tipoDocumentoService.eliminar(id).subscribe({
      next: () => this.cargarDatos(),
      error: (err) => {
        console.error('Error al eliminar', err);
        this.errorMsg.set('No se pudo eliminar el registro.');
      }
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

  onSaved(data: DocumentTypeCreate | DocumentTypeUpdate) {
    const current = this.selectedItem();

    if (current) {
      // Edición: PUT
      this.tipoDocumentoService.actualizar(current.id, data as DocumentTypeUpdate).subscribe({
        next: () => {
          this.cargarDatos();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error al actualizar', err);
          this.errorMsg.set('No se pudo actualizar el registro.');
        }
      });
    } else {
      // Creación: POST
      this.tipoDocumentoService.crear(data as DocumentTypeCreate).subscribe({
        next: () => {
          this.cargarDatos();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error al crear', err);
          this.errorMsg.set('No se pudo crear el registro.');
        }
      });
    }
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

