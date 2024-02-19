import { DestroyRef, Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FolderFormComponent } from '../../components/layout/components/folder-form/folder-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class FolderDialogService {

  private dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);

  openFolderForm() {
    this.dialog.open(FolderFormComponent, {
      height: 'auto', width: 'auto',
      backdropClass: "background-dialog"
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
