import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@fic/ui/pages/sub-menu/sub-menu').then(m => m.SubMenu),
  },
  {
    path: 'rates',
    loadComponent: () => import('@fic/ui/pages/rates/rates').then(m => m.Rates),
  },
];
