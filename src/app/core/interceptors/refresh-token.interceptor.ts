import {HttpClient, HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {SKIP_AUTH} from '@core/constants';
import {inject} from '@angular/core';
import {StorageService} from '@services/storage.service';
import {Router} from '@angular/router';
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, tap, throwError} from 'rxjs';
import {AuthResponseModel} from '@services/auth-response.model';
import {environment} from '@app/environments/environment';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<any>(null);

export const RefreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const httpClient = inject(HttpClient);
  const skipAuth = req.context.get(SKIP_AUTH);
  const refreshToken = storageService.refreshToken;
  if (skipAuth || refreshToken == null) {
    return next(req);
  }

  return next(req).pipe(catchError(err => sessionTimeoutHandler(
    err,
    () => next(req),
    storageService,
    router,
    httpClient)));
}

const sessionTimeoutHandler =
  (error: HttpErrorResponse, retryRequest: () => Observable<any>, storageService: StorageService, router: Router, httpClient: HttpClient): Observable<any> => {
    if (error.status === 401 && storageService.refreshToken) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshTokenSubject.next(null);

        return handleRefreshToken(httpClient, storageService).pipe(
          switchMap((token: any) => {
            isRefreshing = false;
            refreshTokenSubject.next(token.access);
            return retryRequest();
          }),
          catchError(() => {
            isRefreshing = false;
            storageService.clearUserData();
            router.navigate(['/auth/login']);
            return throwError(() => new Error('Session expired'));
          })
        );
      } else {
        return refreshTokenSubject.pipe(
          filter(token => token != null),
          take(1),
          switchMap(() => retryRequest())
        );
      }
    }
    if (error.status === 401) {
      storageService.clearUserData();
      router.navigate(['/auth/login']);
    }
    return throwError(() => error);
  }

const handleRefreshToken = (httpClient: HttpClient,
                            storageService: StorageService,
): Observable<AuthResponseModel> => {
  const refreshToken = storageService.refreshToken;
  const endpoint = `${environment.baseUrl}token/refresh/`;
  return httpClient.post<AuthResponseModel>(
    endpoint,
    {refresh: refreshToken},
  ).pipe(
    tap(response => {
      storageService.tokens = response;
    })
  );
}
