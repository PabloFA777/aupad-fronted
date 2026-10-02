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
import { RolesFormComponent } from './features/auth/pages/roles/roles-form.component';
import { CategoriasSeguroListComponent } from './features/maintenance/pages/categorias-seguro/categorias-seguro-list.component';
import { CompaniasSeguroListComponent } from './features/maintenance/pages/companias-seguro/companias-seguro-list.component';
import { ClientesListComponent } from './features/maintenance/pages/clientes/clientes-list.component';
import { PolizasListComponent } from './features/quotations/pages/polizas/polizas-list.component';
import { CuotasPolizasListComponent } from './features/quotations/pages/cuotas-poliza/cuotas-poliza-list.component';
import { BeneficiariosPolizasListComponent } from './features/quotations/pages/beneficiarios-poliza/beneficiarios-poliza-list.component';
import { DocumentosPolizasListComponent } from './features/quotations/pages/documentos-poliza/documentos-poliza-list.component';

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
      { path: 'seguridad/roles/nuevo', component: RolesFormComponent },
      { path: 'seguridad/roles/editar/:id', component: RolesFormComponent },
      { path: 'maintenance/document-types', component: DocumentTypesListComponent },
      { path: 'maintenance/categorias-seguro', component: CategoriasSeguroListComponent },
      { path: 'maintenance/clientes', component: ClientesListComponent },
      { path: 'maintenance/polizas', component: PolizasListComponent },
      { path: 'maintenance/cuotas-poliza', component: CuotasPolizasListComponent },
      { path: 'maintenance/companias-seguro', component: CompaniasSeguroListComponent },
      { path: 'settings/system-config', component: SystemConfigListComponent },
      { path: 'quotations', component: InsuranceListComponent },
      { path: 'quotations/list', component: InsuranceListComponent },
      { path: 'maintenance/cuotas-poliza', component: CuotasPolizasListComponent },
      { path: 'maintenance/beneficiarios-poliza', component: BeneficiariosPolizasListComponent },
      { path: 'maintenance/documentos-poliza', component: DocumentosPolizasListComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }
];