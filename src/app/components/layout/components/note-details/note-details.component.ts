import { Component, DestroyRef, OnDestroy, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Note } from '../../../../interfaces/note.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from '../../../../services/note.service';
import { RequestStatus } from '../../../../interfaces/request-status.model';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NoteDialogService } from '../../../../services/dialogs/note-dialog.service';
import { UserService } from '../../../../services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormField, MatLabel, ReactiveFormsModule, FormsModule, MatTooltipModule],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.css'
})
export class NoteDetailsComponent implements OnDestroy{

  protected noteData: Note = inject(MAT_DIALOG_DATA);
  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  private noteService = inject(NoteService);
  private noteDialogService = inject(NoteDialogService);

  private dialogRef = inject(MatDialogRef);
  private destroyRef = inject(DestroyRef);

  userNotes$ = this.userService.userNotes$;

  statusSaveNote: RequestStatus = 'init';
  statusArchiveNote: RequestStatus = 'init';
  statusDeleteNote: RequestStatus = 'init';

  noteForm = this.formBuilder.nonNullable.group({
    title: [this.noteData.title, [Validators.maxLength(30)]],
    description: [this.noteData.description, []]
  })


  // Le da al usuario la posibilidad de guardar los cambios si no lo ha hecho
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
      this.statusSaveNote = 'loading';
      const { title, description } = this.noteForm.getRawValue();
      this.noteService.updateNote({ ...this.noteData, title, description })
      // .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(finalize(() => takeUntilDestroyed(this.destroyRef)))
      .subscribe({
        next: (note: Note) => {
          this.userNotes$.update((notes) => {
            notes.splice(notes.findIndex(n => n.id === note.id), 1, note);
            // notes.splice(notes.indexOf(note), 1, note);
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
    this.statusArchiveNote = 'loading';
    this.noteService.archiveNoteById(id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: () => {
        this.statusArchiveNote = 'success';
        this.noteDialogService.openSnackBar('Nota archivada con éxito', 'Cerrar');
      },
      error: () => {
        this.statusArchiveNote = 'failed';
        this.noteDialogService.openSnackBar('No se pudo archivar la nota', 'Cerrar');
      }
    })
  }
  
  deleteNote(id: number): void {
    this.statusDeleteNote = 'loading';
    this.noteService.deleteNote(id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (deletedNote: Note) => {
        this.userNotes$.update((notes) => {
          return notes.filter(note => note.id !== deletedNote.id); 
        });
        this.dialogRef.close();
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
