import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environments';
import { Note } from '../interfaces/note.model';
import { checkToken } from '../interceptors/token.interceptor';
import { MatDialog } from '@angular/material/dialog';
import { NoteDetailsComponent } from '../components/home/components/note-details/note-details.component';
import { NoteFormComponent } from '../components/home/components/note-form/note-form.component';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private http = inject(HttpClient);
  private dialog = inject(MatDialog);
  private tokenService = inject(TokenService);

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

  getUserNotesByStatus(userId: number, status: boolean) {
    const token = this.tokenService.getToken();
    return this.http.get(`${this.apiUrl}/api/notes/user/${userId}/status/${status}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  createNote(note: Note) {
    const token = this.tokenService.getToken();
    return this.http.post(`${this.apiUrl}/api/notes`, {note}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  updateNote(note: Note) {
    const token = this.tokenService.getToken();
    return this.http.put(`${this.apiUrl}/api/notes/${note.id}`, {note}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  archiveNoteById(id: number) {
    const token = this.tokenService.getToken();
    return this.http.put(`${this.apiUrl}/api/notes/${id}/archive`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  deleteNote(id: number) {
    const token = this.tokenService.getToken();
    return this.http.delete(`${this.apiUrl}/api/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  openNoteDetails(note: Note) {
    const dialogRef = this.dialog.open(NoteDetailsComponent, {
      data: note,
      height: 'auto', width: 'auto',
      backdropClass: "background-dialog"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

  openNoteForm(){
    const dialogRef = this.dialog.open(NoteFormComponent, {
      height: 'auto', width: 'auto',
      backdropClass: "background-dialog"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }
}
