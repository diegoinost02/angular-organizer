import { HttpContext, HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { Observable, switchMap } from 'rxjs';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

  tokenService = inject(TokenService);
  authService = inject(AuthService);

  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log("1");

    if (request.context.get(CHECK_TOKEN)){
      console.log("2");
      const isValidToken = this.tokenService.isValidToken();
      if(isValidToken){
        console.log("3");

        return this.addToken(request, next);
      } else{
        console.log("4");
        return this.updateAccesTokenAndRefreshToken(request, next);
      }
    }
    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>, next: HttpHandler){
    console.log("5");

    const accessToken = this.tokenService.getToken();
    if (accessToken){
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }

  private updateAccesTokenAndRefreshToken(request: HttpRequest<unknown>, next: HttpHandler){
    console.log("6");

    const refreshToken = this.tokenService.getRefreshToken();
    const isValidRefreshToken = this.tokenService.isValidRefreshToken();

    if(refreshToken && isValidRefreshToken) {
      return this.authService.refreshToken(refreshToken)
      .pipe(switchMap(() => this.addToken(request, next)))
    }
    return next.handle(request);
  }

}

// export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

//   const tokenService = inject(TokenService);


//   if (req.context.get(CHECK_TOKEN)){
//     const isValidToken = tokenService.isValidToken();
//     if(isValidToken){
//       return addToken(req, next);
//     } else{
//       return updateAccesTokenAndRefreshToken(req, next);
//     }
//   }
//   return next(req);
// }


// export const addToken: HttpInterceptorFn = (req, next) => {

//   const tokenService = inject(TokenService);

//   const accessToken = tokenService.getToken();
//   console.log(accessToken);

//   if (accessToken){
//     const authRequest = req.clone({
//       headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
//     });
//     return next(authRequest);
//   }
//   return next(req);
// }

// export const updateAccesTokenAndRefreshToken: HttpInterceptorFn = (req, next) => {

//   const tokenService = inject(TokenService);
//   const authService = inject(AuthService);

//   const refreshToken = tokenService.getRefreshToken();
//   const isValidRefreshToken = tokenService.isValidRefreshToken();

//   if(refreshToken && isValidRefreshToken) {
//     return authService.refreshToken(refreshToken)
//     .pipe(switchMap(() => addToken(req, next)))
//   }
//   return next(req);
// }