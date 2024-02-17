import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = () => {

  const tokenService = inject(TokenService);
  const isValidToken = tokenService.isValidRefreshToken();
  const router = inject(Router);

  if (!isValidToken) {
    router.navigate(['/']);
    return false;
  }

  return true; 
};
