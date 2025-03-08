import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/essential/auth/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isUserDetailsLoaded().pipe(
        map(isLoaded => {
            if (isLoaded) {
                return true;
            } else {
                return router.createUrlTree(['/login']);
            }
        })
    );
};
