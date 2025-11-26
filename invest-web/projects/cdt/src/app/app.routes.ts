import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@cdt/ui/pages/sub-menu/sub-menu').then(m => m.SubMenu),
  },
  {
    path: 'rates',
    loadComponent: () => import('@cdt/ui/pages/rates/rates').then(m => m.Rates),
  },
];
