import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {StorageService} from '@services/storage.service';

export const authGuardFunction: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);
  const access = storageService.accessToken;
  if (access == null) {
    return true;
  }
  router.navigate(['/posts']);
  return false;
}
