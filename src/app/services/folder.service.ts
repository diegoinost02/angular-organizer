import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environments';
import { Folder } from '../interfaces/folder.model';
import { User } from '../interfaces/user.model';
import { checkToken } from '../interceptors/token.interceptor';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

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
    })
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
