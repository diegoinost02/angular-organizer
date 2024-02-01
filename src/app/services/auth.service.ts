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

  apiUrl: string = environment.API_URL;

  login(username: string, password: string) {
    return this.http.post<ResponseLogin>(`${this.apiUrl}/login`, {username, password})
  }

  create(username: string, email: string, password: string, admin: boolean) { // solo admin
    return this.http.post<ResponseLogin>(`${this.apiUrl}/api/users`, {username, email, password, admin})
  }

  register (username: string, email: string, password: string) {
    return this.http.post<User>(`${this.apiUrl}/api/users/register`, {username, email, password})
  }

  profile(username: string) {
    return this.http.get<User>(`${this.apiUrl}/${username}`)
  }
}
