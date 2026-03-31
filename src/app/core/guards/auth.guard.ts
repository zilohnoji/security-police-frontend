import { inject } from '@angular/core';
import { CanActivateFn, } from '@angular/router';
import { PersonService } from '../services/person-services';
import { map, } from 'rxjs';
import { LocalStorageService } from '../services/local-storage';

export const authGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const personService = inject(PersonService);

  if (!localStorageService.GetAccessToken()) return false;

  return personService.MyProfile().pipe(
    map((response) => {
      return true;
    })
  );
};