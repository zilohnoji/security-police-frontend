import { Routes } from '@angular/router';

import { publicOnlyGuard } from '../../core/guards/public-only.guard';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/auth-layout/auth-layout').then(m => m.AuthLayout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login-form/login-form').then(m => m.LoginForm),
        title: 'Login',
        canActivate: [publicOnlyGuard],
      },
      {
        path: 'cadastro-usuario',
        loadComponent: () => import('../cadastro/pages/cadastro-usuario/cadastro-usuario').then(m => m.CadastroUsuario),
        title: 'Cadastro',
        canActivate: [publicOnlyGuard],
      },
      {
        path: 'cadastro-pessoa/:id',
        loadComponent: () => import('../cadastro/pages/cadastro-pessoa/cadastro-pessoa').then(m => m.CadastroPessoa),
        title: 'Dados Pessoais',
        canActivate: [publicOnlyGuard]
      },
      {
        path: 'ativar/:id',
        loadComponent: () => import('../cadastro/pages/codigo-ativacao/codigo-ativacao').then(m => m.CodigoAtivacao),
        title: 'Ativação',
        canActivate: [publicOnlyGuard],
      }
    ]
  }
];
