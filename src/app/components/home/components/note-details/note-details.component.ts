import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Note } from '../../../../interfaces/note.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoteService } from '../../../../services/note.service';
import { RequestStatus } from '../../../../interfaces/request-status.model';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormField, MatLabel, ReactiveFormsModule, FormsModule],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.css'
})
export class NoteDetailsComponent {
  
  private dialogRef = inject(MatDialogRef);
  protected noteData: Note = inject(MAT_DIALOG_DATA);

  private formBuilder = inject(FormBuilder);
  private noteService = inject(NoteService);

  statusSaveNote: RequestStatus = 'init';
  statusDeleteNote: RequestStatus = 'init';

  noteForm = this.formBuilder.nonNullable.group({
    title: [this.noteData.title, []],
    description: [this.noteData.description, []]
  })

  saveChanges(): void {
    if(this.noteForm.value !== this.noteData) {
      const { title, description } = this.noteForm.getRawValue();
      
      this.noteService.updateNote({ ...this.noteData, title, description }).subscribe({
        next: () =>{
          this.statusSaveNote = 'success';
        },
        error: () => {
          this.statusSaveNote = 'failed';
        }
      })
    }
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id).subscribe({
      next: () => {
        this.statusDeleteNote = 'success';
      },
      error: () => {
        this.statusDeleteNote = 'failed';
      }
    })
  }
}
