import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => loadRemoteModule('home', './HomeRoutes').then(m => m.routes),
  },
  {
    path: 'cdts',
    loadChildren: () => loadRemoteModule('cdt', './CdtRoutes').then(m => m.routes),
  },
  {
    path: 'prototype',
    loadComponent: () => import('./ui/pages/prototype/prototype.component').then(m => m.PrototypeComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
