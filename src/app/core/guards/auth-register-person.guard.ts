import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authRegisterPersonGuard: CanActivateFn = () => {
  const token = localStorage.getItem('accessToken');
  const router = inject(Router);

  if (!token) return router.parseUrl("/login");

  return true;
};