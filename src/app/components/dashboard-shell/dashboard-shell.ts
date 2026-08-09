import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard-shell.html',
  styleUrl: './dashboard-shell.css'
})
export class DashboardShellComponent {
  readonly maintenanceItems = [
    { label: 'Usuarios', path: '/maintenance/users' },
    { label: 'Productos', path: '/maintenance/products' },
    { label: 'Sucursales', path: '/maintenance/branches' },
    { label: 'Tipos de documento', path: '/maintenance/document-types' }
  ];

  readonly quotationItems = [
    { label: 'Cotizaciones', path: '/quotations/list' },
    { label: 'Pólizas', path: '/quotations/policies' },
    { label: 'Reportes', path: '/quotations/reports' }
  ];
}
