import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoteService } from '../../../../services/note.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RequestStatus } from '../../../../interfaces/request-status.model';
import { CreateNoteDto, Note } from '../../../../interfaces/note.model';
import { NoteDialogService } from '../../../../services/note-dialog.service';
import { FolderService } from '../../../../services/folder.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormField, MatLabel, ReactiveFormsModule, FormsModule, MatTooltipModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.css'
})
export class NoteFormComponent {

  private dialogRef = inject(MatDialogRef);
  private formBuilder = inject(FormBuilder);
  private noteService = inject(NoteService);
  private folderService = inject(FolderService);
  private noteDialogService = inject(NoteDialogService);

  userNotes$ = this.noteService.userNotes$;
  user$ = inject(UserService).user$;
  folderSelected$ = this.folderService.folderSelected$;

  noteForm = this.formBuilder.nonNullable.group({
    title: ['', []],
    description: ['', []]
  })

  statusCreateNote: RequestStatus = 'init'

  // Le da al usuario la posibilidad de guardar los cambios si no lo ha hecho
  async ngOnDestroy(): Promise<void> {
    if (this.noteForm.dirty && this.statusCreateNote === 'init') {
      const create: boolean = await this.noteDialogService.openSnackBarWithPromise('No has guardado la nota', 'Guardar', this.noteDialogService.saveChangesOnDestroy);
      if (create) {
        this.createNote();
      }
    }
  }

  createNote(): void {
    const { title, description } = this.noteForm.getRawValue();
    const note: CreateNoteDto = {
      title: title,
      description: description,
      user: this.user$()!,
      folders: [{id: this.folderSelected$()!.id}],
      status: true
    };
    this.noteService.createNote(note).subscribe({ 
      next: (note: Note) => {
        this.userNotes$.update((notes) => { 
          notes.unshift(note);
          return notes
        })
        this.dialogRef.close();
        this.statusCreateNote = 'success';
        this.noteDialogService.openSnackBar('Nota creada con éxito', 'Cerrar');
      },
      error: () => {
        this.statusCreateNote = 'failed';
        this.noteDialogService.openSnackBar('No se pudo crear la nota', 'Cerrar');
      }
    })
  }
}
