import { Component, OnDestroy, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Note } from '../../../../interfaces/note.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoteService } from '../../../../services/note.service';
import { RequestStatus } from '../../../../interfaces/request-status.model';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NoteDialogService } from '../../../../services/note-dialog.service';

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
  private noteDialogService = inject(NoteDialogService);

  userNotes$ = this.noteService.userNotes$;

  statusSaveNote: RequestStatus = 'init';
  statusDeleteNote: RequestStatus = 'init';

  noteForm = this.formBuilder.nonNullable.group({
    title: [this.noteData.title, []],
    description: [this.noteData.description, []]
  })


  // Para darle la posibilidad al usuario de guardar los cambios si no lo ha hecho
  async ngOnDestroy(): Promise<void> {
    if (this.noteForm.dirty && this.statusSaveNote === 'init') {
      const save: boolean = await this.noteDialogService.openSnackBarWithPromise('No has guardado los cambios', 'Guardar', this.noteDialogService.saveChangesOnDestroy);
      if (save) {
        this.saveChanges();
      }
    }
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
          this.noteDialogService.openSnackBar('Cambios guardados con éxito', 'Cerrar');
        },
        error: () => {
          this.statusSaveNote = 'failed';
          this.noteDialogService.openSnackBar('No se pudieron guardar los cambios', 'Cerrar');
        }
      })
    }
  }
  
  archiveNote(id: number): void {
    this.noteService.archiveNoteById(id).subscribe({
      next: () => {
        this.statusDeleteNote = 'success';
        this.noteDialogService.openSnackBar('Nota archivada con éxito', 'Cerrar');
      },
      error: () => {
        this.statusDeleteNote = 'failed';
        this.noteDialogService.openSnackBar('No se pudo archivar la nota', 'Cerrar');
      }
    })
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id).subscribe({
      next: () => {
        this.statusDeleteNote = 'success';
        this.noteDialogService.openSnackBar('Nota borrada con éxito', 'Cerrar');
      },
      error: () => {
        this.statusDeleteNote = 'failed';
        this.noteDialogService.openSnackBar('No se pudo borrar la nota', 'Cerrar');
      }
    })
  }
}
