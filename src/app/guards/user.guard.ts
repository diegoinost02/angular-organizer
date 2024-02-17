import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const userGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const usernameURl = route.params['username'];
  const username = inject(TokenService).getUsernameFromToken();

  if (usernameURl !== username) {
    router.navigate([`/${username}`]);
    return false;
  }

  return true;
};
