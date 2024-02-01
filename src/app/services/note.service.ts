import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environments';
import { Note } from '../interfaces/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private http = inject(HttpClient);

  apiUrl: string = environment.API_URL;

  getNotes() {
    return this.http.get(`${this.apiUrl}/api/notes`)
  }

  getUserNotes(userId: number) {
    return this.http.get(`${this.apiUrl}/api/notes/user/${userId}`)
  }

  createNote(note: Note) {
    return this.http.post(`${this.apiUrl}/api/notes`, {note})
  }

  updateNote(note: Note) {
    return this.http.put(`${this.apiUrl}/api/notes/${note.id}`, {note})
  }

  deleteNote(id: number) {
    return this.http.delete(`${this.apiUrl}/api/notes/${id}`)
  }
}
