import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environments';
import { Note } from '../interfaces/note.model';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private http = inject(HttpClient);

  apiUrl: string = environment.API_URL;

  getNotes() {
    return this.http.get(`${this.apiUrl}/api/notes`, { context: checkToken() })
  }

  getUserNotes(userId: number) {
    return this.http.get(`${this.apiUrl}/api/notes/user/${userId}`, { context: checkToken() })
  }

  createNote(note: Note) {
    return this.http.post(`${this.apiUrl}/api/notes`, {note}, { context: checkToken() })
  }

  updateNote(note: Note) {
    return this.http.put(`${this.apiUrl}/api/notes/${note.id}`, {note}, { context: checkToken() })
  }

  deleteNote(id: number) {
    return this.http.delete(`${this.apiUrl}/api/notes/${id}`, { context: checkToken() })
  }
}
