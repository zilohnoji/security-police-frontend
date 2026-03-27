import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const registeredUserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("accessToken");

  if (email && !token) return true;
  return router.parseUrl("/login");
};
