import { Component, OnDestroy, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Note } from '../../../../interfaces/note.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

  userNotes$ = this.noteService.userNotes$;

  statusSaveNote: RequestStatus = 'init';
  statusDeleteNote: RequestStatus = 'init';

  noteForm = this.formBuilder.nonNullable.group({
    title: [this.noteData.title, []],
    description: [this.noteData.description, []]
  })

  // Para advertir al usuario que no ha guardado los cambios 
  ngOnDestroy(): void {
      if(this.noteForm.dirty && this.statusSaveNote === 'init') {
        this.openSnackBarWithAction('No has guardado los cambios', 'Guardar', this.saveChanges);
      }
  }
  openSnackBarWithAction(message: string, actionMessage: string, action: () => void) {
    this._snackBar.open(message, actionMessage, {
      duration: 6000,
    }).onAction().subscribe({
      next: () => {
        action();
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000})
  }
  saveChanges(): void {
    if(this.noteForm.value !== this.noteData) {
      const { title, description } = this.noteForm.getRawValue();
      this.noteService.updateNote({ ...this.noteData, title, description }).subscribe({
        next: (note: Note) => {
          this.userNotes$.update((notes) => {
            notes[note.id-1] = note;
            return notes
          }
          );
          this.statusSaveNote = 'success';
          this.openSnackBar('Cambios guardados con éxito', 'Cerrar');
        },
        error: () => {
          this.statusSaveNote = 'failed';
          this.openSnackBar('No se pudieron guardar los cambios', 'Cerrar');
        }
      })
    }
  }
  
  archiveNote(id: number): void {
    this.noteService.archiveNoteById(id).subscribe({
      next: () => {
        this.statusDeleteNote = 'success';
        this.openSnackBar('Nota archivada con éxito', 'Cerrar');
      },
      error: () => {
        this.statusDeleteNote = 'failed';
        this.openSnackBar('No se pudo archivar la nota', 'Cerrar');
      }
    })
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id).subscribe({
      next: () => {
        this.statusDeleteNote = 'success';
        this.openSnackBar('Nota borrada con éxito', 'Cerrar');
      },
      error: () => {
        this.statusDeleteNote = 'failed';
        this.openSnackBar('No se pudo borrar la nota', 'Cerrar');
      }
    })
  }
}
