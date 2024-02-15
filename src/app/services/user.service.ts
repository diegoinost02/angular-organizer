import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environments';
import { User } from '../interfaces/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient)
  private tokenService = inject(TokenService)

  apiUrl: string = environment.API_URL;

  getProfile(username: string) {
    const token = this.tokenService.getToken();
    return this.http.get<User>(`${this.apiUrl}/api/users/user/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
