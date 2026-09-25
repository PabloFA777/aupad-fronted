import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { UsuariosFormComponent } from './usuarios-form.component';
import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule, UsuariosFormComponent],
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuariosListComponent implements OnInit {
  private readonly itemsSignal = signal<Usuario[]>([]);

  readonly page = signal(1);
  readonly pageSize = 3;
  readonly isModalOpen = signal(false);
  readonly selectedItem = signal<Usuario | null>(null);
  readonly paginatedItems = signal<Usuario[]>([]);
  readonly totalPages = signal(1);

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  private cargarUsuarios(): void {
    this.usuarioService.obtenerTodos().subscribe({
      next: (usuarios) => {
        this.itemsSignal.set(usuarios);
        this.refreshPage();
      },
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }

  openModal() {
    this.selectedItem.set(null);
    this.isModalOpen.set(true);
  }

  edit(item: Usuario) {
    this.selectedItem.set(item);
    this.isModalOpen.set(true);
  }

  remove(id: number) {
    this.usuarioService.eliminar(id).subscribe({
      next: () => {
        this.itemsSignal.update(items => items.filter(item => item.id !== id));
        this.refreshPage();
      },
      error: (err) => console.error('Error al eliminar usuario', err)
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

  onSaved(): void {
    this.cargarUsuarios();
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