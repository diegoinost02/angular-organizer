import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environments';
import { Folder } from '../interfaces/folder.model';
import { User } from '../interfaces/user.model';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  private http = inject(HttpClient);

  apiUrl: string = environment.API_URL;

  getFolders() {
    return this.http.get<Folder[]>(`${this.apiUrl}/api/folders`, { context: checkToken() })
  }

  getUserFolders(userID: number) {
    return this.http.get<Folder[]>(`${this.apiUrl}/api/folders/user/${userID}`, { context: checkToken() })
  }

  createFolder(folder: Folder) {
    return this.http.post<Folder>(`${this.apiUrl}/api/folders`, {folder}, { context: checkToken() })
  }

  updateFolder(folder: Folder) {
    return this.http.put<Folder>(`${this.apiUrl}/api/folders/${folder.id}`, {folder}, { context: checkToken() })
  }

  deleteFolder(id: number) {
    return this.http.delete<Folder>(`${this.apiUrl}/api/folders/${id}`, { context: checkToken() })
  }
}
