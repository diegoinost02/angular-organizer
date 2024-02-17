import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const redirectGuard: CanActivateFn = () => {

  const isValidToken = inject(TokenService).isValidRefreshToken();
  const router = inject(Router);

  if (isValidToken) {
    const username = inject(TokenService).getUsernameFromToken();

    if (username != null) {
      router.navigate([`/${username}`]);
    }
  }
  return true;
};
