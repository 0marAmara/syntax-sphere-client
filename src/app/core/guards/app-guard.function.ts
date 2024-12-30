import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {getAuthTokens} from '../../shared/auth-tokens.function';

export const appGuardFunction: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (getAuthTokens())
    return true;
  router.navigate(['/auth/login']);
  return false;
}
