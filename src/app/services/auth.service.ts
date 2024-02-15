import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { ResponseLogin, ResponseRefresh } from '../interfaces/response.model';
import { User } from '../interfaces/user.model';
import { switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient)
  private tokenService = inject(TokenService)

  apiUrl: string = environment.API_URL;

  login(username: string, password: string) {
    return this.http.post<ResponseLogin>(`${this.apiUrl}/login`, { username, password })
    .pipe(tap(response =>{
      this.tokenService.saveToken(response.token)
      this.tokenService.saveRefreshToken(response.refresh_token)
    }))
  }

  register(username: string, email: string, password: string) {
    return this.http.post<User>(`${this.apiUrl}/api/users/register`, { username, email, password })
  }

  registerAndLogin(username: string, email: string, password: string) {
    return this.http.post<ResponseLogin>(`${this.apiUrl}/api/users/register`, { username, email, password })
    .pipe(switchMap(() => this.login(username, password)));
  }

  refreshToken(refreshToken: string) {
    const token = this.tokenService.getToken();
    return this.http.post<ResponseRefresh>(`${this.apiUrl}/api/users/refresh`, { refreshToken }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .pipe(tap(response =>{
      this.tokenService.saveToken(response.token)
      this.tokenService.saveRefreshToken(response.refresh_token)
    }))
  }

  // getProfile(username: string) {
  //   return this.http.get<User>(`${this.apiUrl}/api/users/user/${username}`, { context: checkToken() })
  // }

  create(username: string, email: string, password: string, admin: boolean) { // solo admin
    const token = this.tokenService.getToken();
    return this.http.post<ResponseLogin>(`${this.apiUrl}/api/users`, { username, email, password, admin }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
