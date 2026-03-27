import { Routes } from '@angular/router';

import { publicOnlyGuard } from '../../core/guards/public-only.guard';
import { registeredUserGuard } from '../../core/guards/registered-user.guard';
import { authGuard } from '../../core/guards/auth.guard';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth-layout').then(m => m.AuthLayout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        loadComponent: () => import('./login-form/login-form').then(m => m.LoginForm),
        title: 'Login',
        canActivate: [publicOnlyGuard],
      },
      {
        path: 'cadastro-usuario',
        loadComponent: () => import('../cadastro-usuario/cadastro-usuario').then(m => m.CadastroUsuario),
        title: 'Cadastro',
        canActivate: [publicOnlyGuard],
      },
      {
        path: 'ativar',
        loadComponent: () => import('../cadastro-usuario/codigo-ativacao/codigo-ativacao').then(m => m.CodigoAtivacao),
        title: 'Ativação',
        canActivate: [registeredUserGuard],
      },
      {
        path: 'cadastro-pessoa',
        loadComponent: () => import('../cadastro-usuario/cadastro-pessoa/cadastro-pessoa').then(m => m.CadastroPessoa),
        title: 'Dados Pessoais',
        canActivate: [authGuard]
      }
    ]
  }
];
