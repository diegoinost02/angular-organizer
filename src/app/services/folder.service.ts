import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../environments/environments';
import { CreateFolderDto, Folder } from '../interfaces/folder.model';
import { TokenService } from './token.service';
import { tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private userService = inject(UserService);

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
    }).pipe(tap(folders => this.userService.userFolders$.update(() => folders.slice().reverse())),
        tap(folders => this.userService.folderSelected$.update(() => folders[folders.length - 1])))
  }

  createFolder(folder: CreateFolderDto) {
    const token = this.tokenService.getToken();
    return this.http.post<Folder>(`${this.apiUrl}/api/folders/create`, folder, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  updateFolder(folder: Folder) {
    const token = this.tokenService.getToken();
    return this.http.put<Folder>(`${this.apiUrl}/api/folders/update/${folder.id}`, folder, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  deleteFolder(id: number) {
    const token = this.tokenService.getToken();
    return this.http.delete<Folder>(`${this.apiUrl}/api/folders/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
