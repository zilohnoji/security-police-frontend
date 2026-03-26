import { HttpErrorResponse, HttpInterceptorFn, } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { UserService } from '../services/user-service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const credentials = localStorage.getItem('accessToken');
  const userService = inject(UserService);
  const router = inject(Router);

  if (credentials) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${credentials}` },
    });
  }
  return next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      if (e.status !== 401) {
        return throwError(() => e);
      }

      return userService.RefreshToken().pipe(
        switchMap((res) => {
          let newReq = req.clone({
            setHeaders: { Authorization: `Bearer ${res.access_token}` },
          })
          return next(newReq);
        }),
        catchError((e: HttpErrorResponse) => {
          localStorage.removeItem("accessToken");
          router.navigate(['/login']);
          return throwError(() => e);
        })
      );
    })
  )
};