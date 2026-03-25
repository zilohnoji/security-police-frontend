import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { publicOnlyGuard } from './core/guards/public-only.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes),
    canActivate: [publicOnlyGuard],
  },
  {
    path: 'painel',
    loadChildren: () => import('./features/painel/painel.routes').then(m => m.painelRoutes),
    canActivate: [authGuard],
  }
];
