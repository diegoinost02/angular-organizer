import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../environments/environments';
import { Note, CreateNoteDto } from '../interfaces/note.model';
import { TokenService } from './token.service';
import { tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private userService = inject(UserService);

  apiUrl: string = environment.API_URL;

  getNotes() {
    const token = this.tokenService.getToken();
    return this.http.get(`${this.apiUrl}/api/notes`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  getUserNotes(userId: number) {
    const token = this.tokenService.getToken();
    return this.http.get(`${this.apiUrl}/api/notes/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  getNotesByFolderIdAndStatus(folderId: number, status: boolean) { // !!
    const token = this.tokenService.getToken();
    return this.http.get<Note[]>(`${this.apiUrl}/api/notes/folder/${folderId}/status/${status}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(tap(notes => this.userService.userNotes$.update(() => notes.slice().reverse())))
  }

  getUserNotesByStatus(userId: number, status: boolean) {
    const token = this.tokenService.getToken();
    return this.http.get(`${this.apiUrl}/api/notes/user/${userId}/status/${status}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  createNote(note: CreateNoteDto) {
    const token = this.tokenService.getToken();
    return this.http.post<Note>(`${this.apiUrl}/api/notes/create`, note, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  updateNote(note: Note) {
    const token = this.tokenService.getToken();
    const {id, title, description} = note;
    return this.http.put<Note>(`${this.apiUrl}/api/notes/update/${id}`, {id, title, description}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  archiveNoteById(id: number) {
    const token = this.tokenService.getToken();
    return this.http.put(`${this.apiUrl}/api/notes/archive/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  deleteNote(id: number) {
    const token = this.tokenService.getToken();
    return this.http.delete<Note>(`${this.apiUrl}/api/notes/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
