import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { SKIP_AUTH } from '@core/constants';
import { StorageService } from '@shared/services';

export const AttachAccessTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(StorageService);

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

  return next(req);
};
