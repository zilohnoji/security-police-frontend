import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

export const publicOnlyGuard: CanActivateFn = (): boolean | UrlTree => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);
  const token = localStorageService.GetAccessToken();

  if (!token) return true;

  return router.parseUrl('/painel');
};