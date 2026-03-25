import { Routes } from '@angular/router';

export const painelRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./painel-admin/painel-admin').then(m => m.PainelAdmin),
    children: [
      {
        path: '',
        loadComponent: () => import('./painel-admin/control-panel/control-panel').then(m => m.ControlPanel),
        title: 'Home'
      },
      {
        path: 'users',
        loadComponent: () => import('./painel-admin/control-users/control-users').then(m => m.ControlUsers),
        title: 'Usuários'
      }
    ]
  }
];