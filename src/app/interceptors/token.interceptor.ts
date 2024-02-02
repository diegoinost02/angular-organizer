import { HttpContext, HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenService = inject(TokenService);

  if (req.context.get(CHECK_TOKEN)){
    const isValidToken = tokenService.isValidToken();
    if(isValidToken){
      return addToken(req, next);
    } else{
      return updateAccesTokenAndRefreshToken(req, next);
    }
  }
  return next(req);
}


export const addToken: HttpInterceptorFn = (req, next) => {

  const tokenService = inject(TokenService);

  const accessToken = tokenService.getToken();
  if (accessToken){
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
    });
    return next(authRequest);
  }
  return next(req);
}

export const updateAccesTokenAndRefreshToken: HttpInterceptorFn = (req, next) => {

  const tokenService = inject(TokenService);
  const authService = inject(AuthService);

  const refreshToken = tokenService.getRefreshToken();
  const isValidRefreshToken = tokenService.isValidRefreshToken();

  if(refreshToken && isValidRefreshToken) {
    return authService.refreshToken(refreshToken)
    .pipe(switchMap(() => addToken(req, next)))
  }
  return next(req);
}