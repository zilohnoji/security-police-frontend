import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/user.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const userService = inject(UserService);
  const router = inject(Router);
  return next(req.clone()).pipe(
    catchError((e: HttpErrorResponse) => {
      const accessToken = localStorageService.GetAccessToken();
      const refreshToken = localStorageService.GetRefreshToken();

      if (e.status === 401 && (accessToken && refreshToken)) {
        return userService.RefreshToken().pipe(
          switchMap((res) => {
            return next(req.clone({
              setHeaders: { Authorization: `Bearer ${res.access_token}` },
            }));
          }),
          catchError((e: HttpErrorResponse) => {
            localStorageService.ClearTokens();
            router.navigate(['/login']);
            return throwError(() => e);
          })
        )
      }
      return throwError(() => e);
    })
  );
};
