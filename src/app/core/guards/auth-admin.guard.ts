import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.GetUserRole() === 'admin') {
    return true;
  } else if (authService.GetUserRole() === 'agent') {
    return router.parseUrl('/painel/agent');
  }
  return false;
};
