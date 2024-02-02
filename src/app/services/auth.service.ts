import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { ResponseLogin, ResponseRefresh } from '../interfaces/response.model';
import { User } from '../interfaces/user.model';
import { switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient)
  private tokenServicec = inject(TokenService)

  apiUrl: string = environment.API_URL;

  login(username: string, password: string) {
    return this.http.post<ResponseLogin>(`${this.apiUrl}/login`, { username, password })
    .pipe(tap(response =>{
      this.tokenServicec.saveToken(response.token)
      this.tokenServicec.saveRefreshToken(response.refresh_token)
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
    return this.http.post<ResponseRefresh>(`${this.apiUrl}/api/users/refresh`, { refreshToken }, { context: checkToken() })
    .pipe(tap(response =>{
      this.tokenServicec.saveToken(response.token)
      this.tokenServicec.saveRefreshToken(response.refresh_token)
    }))
  }

  profile(username: string) {
    return this.http.get<User>(`${this.apiUrl}/${username}`, { context: checkToken() })
  }

  create(username: string, email: string, password: string, admin: boolean) { // solo admin
    return this.http.post<ResponseLogin>(`${this.apiUrl}/api/users`, { username, email, password, admin }, { context: checkToken() })
  }
}
