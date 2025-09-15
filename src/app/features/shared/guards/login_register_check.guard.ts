import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const loginRegisterCheckGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  return token ? router.createUrlTree(['/home/dashboard']) : true;
};
