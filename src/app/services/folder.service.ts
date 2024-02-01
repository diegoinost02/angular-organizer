import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environments';
import { Folder } from '../interfaces/folder.model';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  private http = inject(HttpClient);

  apiUrl: string = environment.API_URL;

  getFolders() {
    return this.http.get<Folder[]>(`${this.apiUrl}/api/folders`)
  }
  
  getUserFolders(userID: number) {
    return this.http.get<Folder[]>(`${this.apiUrl}/api/folders/user/${userID}`)
  }

  createFolder(folder: Folder) {
    return this.http.post<Folder>(`${this.apiUrl}/api/folders`, {folder})
  }

  updateFolder(folder: Folder) {
    return this.http.put<Folder>(`${this.apiUrl}/api/folders/${folder.id}`, {folder})
  }

  deleteFolder(id: number) {
    return this.http.delete<Folder>(`${this.apiUrl}/api/folders/${id}`)
  }
}
