import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {getAuthTokens} from '../../shared/auth-tokens.function';

export const authGuardFunction:CanActivateFn = (route, state)=>{
  const router = inject(Router);
  if(getAuthTokens().access.length==0&&getAuthTokens().refresh.length==0)
    return true;
  router.navigate(['/posts']);
  return false;
}
