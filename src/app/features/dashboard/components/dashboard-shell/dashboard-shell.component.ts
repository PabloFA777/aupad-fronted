import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard-shell.component.html',
  styleUrl: './dashboard-shell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardShellComponent {
  readonly isSidebarOpen = signal(false);

  onLogoLoad(event: Event) {
    const target = event.target as HTMLImageElement;
    target.classList.add('loaded');
    target.classList.remove('error');
  }

  onLogoError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.classList.add('error');
    target.classList.remove('loaded');
  }

  readonly maintenanceItems = [
    { label: 'Usuarios', path: '/maintenance/users' },
    { label: 'Roles', path: '/maintenance/roles' },
    { label: 'Productos', path: '/maintenance/products' },
    { label: 'Sucursales', path: '/maintenance/branches' },
    { label: 'Tipos de documento', path: '/maintenance/document-types' }
  ];

  readonly quotationItems = [
    { label: 'Cotizaciones', path: '/quotations/list' },
    { label: 'Pólizas', path: '/quotations/policies' },
    { label: 'Reportes', path: '/quotations/reports' }
  ];

  readonly settingsItems = [
    { label: 'Configuración', path: '/settings/system-config' }
  ];

  toggleSidebar() {
    this.isSidebarOpen.update(value => !value);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }
}
