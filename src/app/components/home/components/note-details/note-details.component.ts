import { Component, OnDestroy, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Note } from '../../../../interfaces/note.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoteService } from '../../../../services/note.service';
import { RequestStatus } from '../../../../interfaces/request-status.model';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormField, MatLabel, ReactiveFormsModule, FormsModule, MatTooltipModule],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.css'
})
export class NoteDetailsComponent implements OnDestroy{
  
  private dialogRef = inject(MatDialogRef);
  protected noteData: Note = inject(MAT_DIALOG_DATA);

  private formBuilder = inject(FormBuilder);
  private noteService = inject(NoteService);

  private _snackBar = inject(MatSnackBar);

  statusSaveNote: RequestStatus = 'init';
  statusDeleteNote: RequestStatus = 'init';

  noteForm = this.formBuilder.nonNullable.group({
    title: [this.noteData.title, []],
    description: [this.noteData.description, []]
  })

  // Para advertir al usuario que no ha guardado los cambios 
  ngOnDestroy(): void {
      if(this.noteForm.dirty && this.statusSaveNote === 'init') {
        this.openSnackBar('No has guardado los cambios', 'Guardar', this.saveChanges);
      }
  }
  openSnackBar(message: string, actionMessage: string, action: () => void) {
    this._snackBar.open(message, actionMessage, {
      duration: 5000,
    }).onAction().subscribe({
      next: () => {
        action();
      }
    });
  }

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
