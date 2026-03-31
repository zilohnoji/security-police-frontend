import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { PersonService } from '../services/person-services';
import { map } from 'rxjs';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const personService = inject(PersonService);

  return personService.MyProfile().pipe(
    map((response) => {
      if (response.role.toLowerCase() === 'admin') {
        return true;
      }
      return false;
    })
  )
};
