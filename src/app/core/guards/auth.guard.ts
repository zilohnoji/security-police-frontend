import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PersonServices } from '../services/person-services';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const token = localStorage.getItem('accessToken');
  const router = inject(Router);
  const personService = inject(PersonServices);

  if (!token) return router.parseUrl("/login");

  return personService.MyProfile().pipe(
    map((response) => {
      console.log(response);
      return true;
    }),
    catchError((err) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return of(router.parseUrl("/login"));
    })
  );
};