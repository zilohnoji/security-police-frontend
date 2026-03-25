import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const credentials = localStorage.getItem('accessToken');

  if (credentials) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${credentials}` },
    });
  }
  return next(req);
};