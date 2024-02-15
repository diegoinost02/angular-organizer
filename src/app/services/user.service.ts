import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environments';
import { User } from '../interfaces/user.model';
import { TokenService } from './token.service';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient)
  private tokenService = inject(TokenService)
  user$ = new BehaviorSubject<User | null>(null);

  apiUrl: string = environment.API_URL;

  getProfile(username: string) {
    const token = this.tokenService.getToken();
    return this.http.get<User>(`${this.apiUrl}/api/users/user/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(tap(user => this.user$.next(user)))
  }
}
