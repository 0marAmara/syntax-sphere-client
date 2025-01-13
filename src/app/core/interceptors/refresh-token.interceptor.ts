import {HttpInterceptorFn} from '@angular/common/http';
import {SKIP_AUTH} from '@core/constants';
import {inject} from '@angular/core';
import {StorageService} from '@services/storage.service';
import {HttpService} from '@services/http.service';
import {Router} from '@angular/router';


export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const httpService = inject(HttpService);
  const router = inject(Router);

  const storageService = inject(StorageService);
  const skipAuth = req.context.get(SKIP_AUTH);
  const refreshToken = storageService.refreshToken;
  if (skipAuth || refreshToken == null) {
    return next(req);
  }

  //TODO idk its complicated
  return next(req);
}

