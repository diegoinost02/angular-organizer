import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environments';
import { Note } from '../interfaces/note.model';
import { checkToken } from '../interceptors/token.interceptor';
import { MatDialog } from '@angular/material/dialog';
import { NoteDetailsComponent } from '../components/home/components/note-details/note-details.component';
import { NoteFormComponent } from '../components/home/components/note-form/note-form.component';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private http = inject(HttpClient);
  private dialog = inject(MatDialog);

  apiUrl: string = environment.API_URL;

  getNotes() {
    return this.http.get(`${this.apiUrl}/api/notes`, { context: checkToken() })
  }

  getUserNotes(userId: number) {
    return this.http.get(`${this.apiUrl}/api/notes/user/${userId}`, { context: checkToken() })
  }

  getUserNotesByStatus(userId: number, status: boolean) {
    return this.http.get(`${this.apiUrl}/api/notes/user/${userId}/status/${status}`, { context: checkToken() })
  }

  createNote(note: Note) {
    return this.http.post(`${this.apiUrl}/api/notes`, {note}, { context: checkToken() })
  }

  updateNote(note: Note) {
    return this.http.put(`${this.apiUrl}/api/notes/${note.id}`, {note}, { context: checkToken() })
  }

  archiveNoteById(id: number) {
    return this.http.put(`${this.apiUrl}/api/notes/${id}/archive`, { context: checkToken() })
  }

  deleteNote(id: number) {
    return this.http.delete(`${this.apiUrl}/api/notes/${id}`, { context: checkToken() })
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
