import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./ui/components/dummy/dummy.component').then(m => m.DummyComponent),
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
