import { inject } from '@angular/core';
import { CanActivateFn, Router, } from '@angular/router';
import { PersonService } from '../services/person.service';
import { catchError, map, tap, throwError, } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const personService = inject(PersonService);
  const localStorageService = inject(LocalStorageService);
  const accessToken = localStorageService.GetAccessToken();
  const router = inject(Router);

  if (!accessToken) router.navigate(['/login']);

  return personService.MyProfile().pipe(
    map((response) => {
      if (!authService.GetAuthenticatedUser()) {
        authService.SetAuthenticatedUser(response);
      }
      return true;
    }),
    catchError((error) => {
      authService.ClearAuthUser();
      router.navigate(['/login']);
      return throwError(() => error);
    })
  );
};