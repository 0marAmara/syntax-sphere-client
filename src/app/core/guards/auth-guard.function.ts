import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const authGuardFunction:CanActivateFn = (route, state)=>{
  const authService= inject(AuthService);
  const router = inject(Router);
  if(!authService.authTokens.access)
    return true;
  router.navigate(['/posts']);
  return false;
}
