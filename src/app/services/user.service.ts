import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../environments/environments';
import { User } from '../interfaces/user.model';
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

  logout() {
    this.tokenService.removeRefreshToken();
    this.tokenService.removeToken();
    this.router.navigate(['/']);
  }
}
