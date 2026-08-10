import { Routes } from '@angular/router';
import { DashboardShellComponent } from './features/dashboard/components/dashboard-shell/dashboard-shell.component';
import { HomePageComponent } from './features/dashboard/pages/home/home-page.component';
import { DocumentTypesListComponent } from './features/maintenance/pages/document-types/document-types-list.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { UsuariosListComponent } from './features/seguridad/pages/usuarios/usuarios-list.component';
import { RolesListComponent } from './features/auth/pages/roles/roles-list.component';
import { SystemConfigListComponent } from './features/settings/pages/system-config/system-config-list.component';
import { InsuranceListComponent } from './features/quotations/pages/insurance/insurance-list.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: DashboardShellComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: HomePageComponent },
      { path: 'seguridad/usuarios', component: UsuariosListComponent },
      { path: 'seguridad/roles', component: RolesListComponent },
      { path: 'maintenance/document-types', component: DocumentTypesListComponent },
      { path: 'settings/system-config', component: SystemConfigListComponent },
      { path: 'quotations', component: InsuranceListComponent },
      { path: 'quotations/list', component: InsuranceListComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];