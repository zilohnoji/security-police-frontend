import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authAgentGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.GetUserRole() === 'agent') {
    return true;
  } else if (authService.GetUserRole() === 'admin') {
    return router.parseUrl('/painel/admin');
  }
  return false;
};