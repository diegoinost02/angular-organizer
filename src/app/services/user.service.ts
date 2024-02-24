import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../environments/environments';
import { UpdateUserDto, User } from '../interfaces/user.model';
import { TokenService } from './token.service';
import { tap } from 'rxjs';
import { Folder } from '../interfaces/folder.model';
import { Note } from '../interfaces/note.model';
import { RequestStatus } from '../interfaces/request-status.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private tokenService = inject(TokenService);

  user$ = signal<User | null>(null);
  userFolders$ = signal<Folder[]>([]);
  folderSelected$ = signal<Folder | null>(null);
  userNotes$ = signal<Note[]>([]);
  
  valueToEdit = signal<'username' | 'email' | 'password' | null>(null);

  userRequestStatus = signal<RequestStatus>('init');
  foldersRequestStatus = signal<RequestStatus>('init');

  apiUrl: string = environment.API_URL;

  getProfile(username: string) {
    const token = this.tokenService.getToken();
    return this.http.get<User>(`${this.apiUrl}/api/users/user/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(tap(user => this.user$.update(() => user)));
  }

  updateUser(user: UpdateUserDto) {
    const token = this.tokenService.getToken();
    return this.http.put<User>(`${this.apiUrl}/api/users/update/${user.id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  logout() {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    this.router.navigate(['/']);
  }
}
