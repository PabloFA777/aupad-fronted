import { Routes } from '@angular/router';
import { DashboardShellComponent } from './features/dashboard/components/dashboard-shell/dashboard-shell.component';
import { HomePageComponent } from './features/dashboard/pages/home/home-page.component';
import { DocumentTypesListComponent } from './features/maintenance/pages/document-types/document-types-list.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardShellComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'maintenance', component: HomePageComponent },
      { path: 'maintenance/users', component: HomePageComponent },
      { path: 'maintenance/products', component: HomePageComponent },
      { path: 'maintenance/branches', component: HomePageComponent },
      { path: 'maintenance/document-types', component: DocumentTypesListComponent },
      { path: 'quotations', component: HomePageComponent },
      { path: 'quotations/list', component: HomePageComponent },
      { path: 'quotations/policies', component: HomePageComponent },
      { path: 'quotations/reports', component: HomePageComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
