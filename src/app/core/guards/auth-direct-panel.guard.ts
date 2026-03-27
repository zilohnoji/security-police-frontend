import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PersonServices } from '../services/person-services';
import { catchError, map, of } from 'rxjs';

export const authDirectPanelGuard: CanActivateFn = (route, state) => {
  const personService = inject(PersonServices);
  const router = inject(Router);

  return personService.MyProfile().pipe(
    map((response) => {
      if (response.role.toLowerCase() === 'admin') {
        if (state.url.includes('/painel/admin')) return true;

        return router.parseUrl("/painel/admin");
      }

      if (response.role.toLocaleLowerCase() === 'agent') {
        if (state.url.includes('/painel/agent')) return true;
        
        return router.parseUrl("/painel/agent");
      }
      return router.parseUrl("/login");
    }),
    catchError((err) => {
      return of(router.parseUrl("/login"));
    })
  )
};
