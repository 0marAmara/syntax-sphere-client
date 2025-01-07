import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { SKIP_AUTH } from '@core/constants';
import { StorageService } from '@shared/services';
import { AuthService } from '@services/auth.service';

export const AttachAccessTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(StorageService);
  const authService = inject(AuthService);

  const skipAuth = req.context.get(SKIP_AUTH);

  if (skipAuth) {
    return next(req);
  }

  const accessToken = storage.accessToken;

  if (accessToken) {
    const _req = req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` },
    });

    return next(_req);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        return throwError(() => new Error('Session expired'));
      }
      return throwError(
        () => new Error('An error occurred. Please try again later.')
      );
    })
  );
};
