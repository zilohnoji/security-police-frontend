import { Routes } from '@angular/router';
import { authDirectPanelGuard } from '../../core/guards/auth-direct-panel.guard';
import { authAdminGuard } from '../../core/guards/auth-admin.guard';
import { authAgentGuard } from '../../core/guards/auth-agent.guard';

export const painelRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./painel').then(m => m.Painel),
    canActivate: [authDirectPanelGuard],
    children: [
      {
        path: 'admin',
        loadComponent: () => import('./pages/admin/painel-admin').then(m => m.PainelAdmin),
        canActivate: [authAdminGuard],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/admin/control-panel/control-panel').then(m => m.ControlPanel),
            title: 'Home'
          },
          {
            path: 'users',
            loadComponent: () => import('./pages/admin/control-users/control-users').then(m => m.ControlUsers),
            title: 'Usuários'
          }
        ]
      },
      {
        path: 'agent',
        loadComponent: () => import('./pages/agent/painel-agent').then(m => m.PainelAgent),
        canActivate: [authAgentGuard],
        children: []
      }
    ]
  },
];