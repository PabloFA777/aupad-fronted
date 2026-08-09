import { Routes } from '@angular/router';
import { DashboardShellComponent } from './features/dashboard/components/dashboard-shell/dashboard-shell.component';
import { HomePageComponent } from './features/dashboard/pages/home/home-page.component';
import { DocumentTypesListComponent } from './features/maintenance/pages/document-types/document-types-list.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { UsersListComponent } from './features/auth/pages/users/users-list.component';
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
      { path: 'maintenance', component: HomePageComponent },
      { path: 'maintenance/users', component: UsersListComponent },
      { path: 'maintenance/roles', component: RolesListComponent },
      { path: 'maintenance/products', component: HomePageComponent },
      { path: 'maintenance/branches', component: HomePageComponent },
      { path: 'maintenance/document-types', component: DocumentTypesListComponent },
      { path: 'settings/system-config', component: SystemConfigListComponent },
      { path: 'quotations', component: InsuranceListComponent },
      { path: 'quotations/list', component: InsuranceListComponent },
      { path: 'quotations/policies', component: HomePageComponent },
      { path: 'quotations/reports', component: HomePageComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
