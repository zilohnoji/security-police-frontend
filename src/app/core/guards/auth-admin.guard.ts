import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PersonServices } from '../services/person-services';
import { catchError, map, of } from 'rxjs';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const personService = inject(PersonServices);
  const router = inject(Router);

  return personService.MyProfile().pipe(
    map((response) => {
      if (!(response.role.toLowerCase() === 'admin')) {
        return router.parseUrl("/login");
      }
      return true;
    }),
    catchError((err) => {
      return of(router.parseUrl("/login"));
    })
  )
};
