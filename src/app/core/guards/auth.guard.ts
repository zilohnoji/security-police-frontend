import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PersonService } from '../services/person-services';
import { catchError, map, of } from 'rxjs';
import { LocalStorageService } from '../services/local-storage';

export const authGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  const personService = inject(PersonService);

  if (!localStorageService.GetAccessToken()) return router.parseUrl("/login");

  return personService.MyProfile().pipe(
    map((response) => true),
    catchError((err) => {
      localStorageService.ClearTokens();
      return of(router.parseUrl("/login"));
    })
  );
};