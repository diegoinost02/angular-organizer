import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../environments/environments';
import { Folder } from '../interfaces/folder.model';
import { TokenService } from './token.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  userFolders$ = signal<Folder[]>([])
  folderSelected = signal<Folder | null>(null)

  apiUrl: string = environment.API_URL;

  getFolders() {
    const token = this.tokenService.getToken();
    return this.http.get<Folder[]>(`${this.apiUrl}/api/folders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  getUserFolders(userID: number) {
    const token = this.tokenService.getToken();
    return this.http.get<Folder[]>(`${this.apiUrl}/api/folders/user/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(tap(folders => this.userFolders$.update(() => folders)))
  }

  createFolder(folder: Folder) {
    const token = this.tokenService.getToken();
    return this.http.post<Folder>(`${this.apiUrl}/api/folders`, {folder}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  updateFolder(folder: Folder) {
    const token = this.tokenService.getToken();
    return this.http.put<Folder>(`${this.apiUrl}/api/folders/${folder.id}`, {folder}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  deleteFolder(id: number) {
    const token = this.tokenService.getToken();
    return this.http.delete<Folder>(`${this.apiUrl}/api/folders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
