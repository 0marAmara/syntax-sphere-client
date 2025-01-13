import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {StorageService} from '@services/storage.service';

export const appGuardFunction: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);
  const access = storageService.accessToken;
  if (access != null)
    return true;
  router.navigate(['/auth/login']);
  return false;
}
