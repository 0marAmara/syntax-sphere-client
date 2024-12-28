import {HttpInterceptorFn} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';


export const authInterceptorFunction: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('sign'))
    return next(req);
  const authService = inject(AuthService);
  const authTokens = authService.authTokens;

  const modifiedRequest = req.clone({
    headers: req.headers.append('Authorization',`Bearer ${authTokens.access}`)
  })
  return next(modifiedRequest);
}
