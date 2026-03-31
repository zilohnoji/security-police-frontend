import { inject } from '@angular/core';
import { CanActivateFn, } from '@angular/router';
import { PersonService } from '../services/person.service';
import { map, } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const personService = inject(PersonService);
  const accessToken = localStorageService.GetAccessToken();

  if (!accessToken) return false;

  return personService.MyProfile().pipe(
    map((response) => {
      return true;
    })
  );
};