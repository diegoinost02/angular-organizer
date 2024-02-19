import { DestroyRef, Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FolderFormComponent } from '../../components/layout/components/folder-form/folder-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FolderDetailsComponent } from '../../components/layout/components/folder-details/folder-details.component';
import { Folder } from '../../interfaces/folder.model';

@Injectable({
  providedIn: 'root'
})
export class FolderDialogService {

  private dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);

  openFolderDetails(folder: Folder) {
    this.dialog.open(FolderDetailsComponent, {
      data: folder,
      height: 'auto', width: 'auto',
      backdropClass: "background-dialog"
    });
  }
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
