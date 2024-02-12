import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Note } from '../../../../interfaces/note.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormField, MatLabel],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.css'
})
export class NoteDetailsComponent {
  
  private dialogRef = inject(MatDialogRef);

  noteData: Note = inject(MAT_DIALOG_DATA);
  noteToEdit: Note = {...this.noteData};

  save() {}

  deleteNote() {}
}
