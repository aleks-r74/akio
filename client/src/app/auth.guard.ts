import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authService: AuthenticationService = inject(AuthenticationService);

  if(authService.isAuthenticated()) return true;
  else {
    router.navigate(['/login']);
    return false;
  }
};
