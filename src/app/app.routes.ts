import { Routes } from '@angular/router';
import { DashboardShellComponent } from './components/dashboard-shell/dashboard-shell';
import { HomePageComponent } from './pages/home/home-page';
import { MaintenancePageComponent } from './pages/maintenance/maintenance-page';
import { QuotationPageComponent } from './pages/quotations/quotation-page';

export const routes: Routes = [
  {
    path: '',
    component: DashboardShellComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'maintenance', component: MaintenancePageComponent },
      { path: 'maintenance/users', component: MaintenancePageComponent },
      { path: 'maintenance/products', component: MaintenancePageComponent },
      { path: 'maintenance/branches', component: MaintenancePageComponent },
      { path: 'quotations', component: QuotationPageComponent },
      { path: 'quotations/list', component: QuotationPageComponent },
      { path: 'quotations/policies', component: QuotationPageComponent },
      { path: 'quotations/reports', component: QuotationPageComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
