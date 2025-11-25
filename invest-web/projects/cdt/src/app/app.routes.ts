import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ui/pages/sub-menu/sub-menu').then(m => m.SubMenu),
  },
  {
    path: 'rates',
    loadComponent: () => import('./ui/pages/rates/rates').then(m => m.Rates),
  },
];
