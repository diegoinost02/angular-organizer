import { DestroyRef, Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from '../../interfaces/note.model';
import { MatDialog } from '@angular/material/dialog';
import { NoteDetailsComponent } from '../../components/layout/components/note-details/note-details.component';
import { NoteFormComponent } from '../../components/layout/components/note-form/note-form.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class NoteDialogService {

  private dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);

  openNoteDetails(note: Note) {
    this.dialog.open(NoteDetailsComponent, {
      data: note,
      height: 'auto', width: 'auto',
      backdropClass: "background-dialog"
    });
  }

  openNoteForm() {
    this.dialog.open(NoteFormComponent, {
      height: 'auto', width: 'auto',
      backdropClass: "background-dialog",
    });
  }

  async openSnackBarWithPromise(message: string, actionMessage: string, action: () => boolean): Promise<boolean> {
    return new Promise((resolve) => {
      this._snackBar.open(message, actionMessage, {
        duration: 6000,
      }).onAction()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        resolve(action());
      });
    });
  }
  
  saveChangesOnDestroy(): boolean {
    return true
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000})
  }
}
