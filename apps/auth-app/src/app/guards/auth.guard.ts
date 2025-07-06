import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  if (sessionStorage.getItem('email')) {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['login']);
    return false;
  }
};
