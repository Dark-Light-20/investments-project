import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // loadComponent: () => import('@pocket/ui/pages/sub-menu/sub-menu').then(m => m.SubMenu),
    redirectTo: 'simulate',
    pathMatch: 'full',
  },
  /* {
    path: 'rates',
    loadComponent: () => import('@pocket/ui/pages/rates/rates').then(m => m.Rates),
  }, */
  {
    path: 'simulate',
    loadComponent: () => import('@pocket/ui/pages/simulate/simulate').then(m => m.Simulate),
  },
];
