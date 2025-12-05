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
    path: 'fics',
    loadChildren: () => loadRemoteModule('fic', './FicRoutes').then(m => m.routes),
  },
  {
    path: 'pockets',
    // TODO
    // loadChildren: () => loadRemoteModule('pocket', './PocketRoutes').then(m => m.routes),
    children: [{ path: '**', redirectTo: '/soon', pathMatch: 'full' }],
  },
  {
    path: 'soon',
    loadComponent: () => import('./ui/pages/soon/soon').then(m => m.Soon),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
