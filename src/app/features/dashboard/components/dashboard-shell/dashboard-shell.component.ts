import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppBrandComponent } from '../../../../shared/components/app-brand/app-brand.component';
import { AuthService } from '../../../../core/services/auth.service';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-dashboard-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, AppBrandComponent],
  templateUrl: './dashboard-shell.component.html',
  styleUrl: './dashboard-shell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardShellComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly theme = inject(ThemeService);

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
  { label: 'Usuarios', path: '/seguridad/usuarios' },
  { label: 'Roles', path: '/seguridad/roles' },
  { label: 'Tipos de documento', path: '/maintenance/document-types' },
  { label: 'Categorías de seguro', path: '/maintenance/categorias-seguro' },
  { label: 'Compañías de seguro', path: '/maintenance/companias-seguro' },
  { label: 'Clientes', path: '/maintenance/clientes' }
  ];

  readonly quotationItems = [
  { label: 'Seguros', path: '/quotations/list' },
  { label: 'Pólizas', path: '/maintenance/polizas' },
  { label: 'Cuotas de póliza', path: '/maintenance/cuotas-poliza' }
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
