import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PersonService } from '../services/person-services';
import { catchError, map, of } from 'rxjs';

export const authAgentGuard: CanActivateFn = (route, state) => {
  const personService = inject(PersonService);
  const router = inject(Router);

  return personService.MyProfile().pipe(
    map((response) => {
      if (response.role.toLowerCase() == 'agent') {
        return true;
      }
      return false;
    }),
    catchError((err) => {
      return of(router.parseUrl("/login"));
    })
  )
};