import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { ResponseLogin, ResponseRefresh } from '../interfaces/response.model';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  apiUrl = environment.API_URL;

  login(username: string, password: string) {
    return this.http.post<ResponseLogin>(`${this.apiUrl}/login`, {username, password})
  }

  create(username: string, email: string, password: string, admin: boolean) { // solo admin
    return this.http.post<ResponseLogin>(`${this.apiUrl}/register`, {username, email, password, admin})
  }

  register (username: string, email: string, password: string) {
    return this.http.post<User>(`${this.apiUrl}/api/users/register`, {username, email, password})
  }

  refreshToken (refreshToken: string) {
    return this.http.post<ResponseRefresh>(`${this.apiUrl}/api/users/refresh`, {refreshToken})
  }

}
