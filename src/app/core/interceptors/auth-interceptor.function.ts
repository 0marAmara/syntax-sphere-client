import {HttpInterceptorFn} from '@angular/common/http';
import {getAuthTokens} from '../../shared/auth-tokens.function';


export const authInterceptorFunction: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('sign'))
    return next(req);
  const authTokens = getAuthTokens();

  const modifiedRequest = req.clone({
    headers: req.headers.append('Authorization',`Bearer ${authTokens.access}`)
  })
  return next(modifiedRequest);
}
