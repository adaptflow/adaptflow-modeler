import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/essential/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  //Currently, http interceptor can handle authenticated request.
  //It placeholder for the future development
  return true;
};
