import { Component, DestroyRef, OnDestroy, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../services/user.service';
import { FolderService } from '../../../../services/folder.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestStatus } from '../../../../interfaces/request-status.model';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { CreateFolderDto, Folder } from '../../../../interfaces/folder.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FolderDialogService } from '../../../../services/dialogs/folder-dialog.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-folder-details',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, MatTooltipModule],
  templateUrl: './folder-details.component.html',
  styleUrl: './folder-details.component.css'
})
export class FolderDetailsComponent implements OnDestroy{

  protected folderData: Folder = inject(MAT_DIALOG_DATA);

  private userService = inject(UserService);
  private folderService = inject(FolderService);
  private folderDialogService = inject(FolderDialogService)

  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef);
  private destroyRef = inject(DestroyRef);

  user$ = this.userService.user$;
  userFolders$ = this.userService.userFolders$;
  folderSelected$ = this.userService.folderSelected$;

  statusSaveFolder: RequestStatus = 'init';
  statusDeleteFolder: RequestStatus = 'init';

  folderForm = this.formBuilder.nonNullable.group({
    name: [this.folderData.name, [Validators.required, Validators.maxLength(50)]]
  })

  async ngOnDestroy(): Promise<void> {
    if (this.folderForm.dirty && this.statusSaveFolder === 'init') {
      const save: boolean = await this.folderDialogService.openSnackBarWithPromise('No has guardado los cambios', 'Guardar', this.folderDialogService.saveChangesOnDestroy);
      if (save) {
        this.saveChanges();
      }
    }
  }

  saveChanges(): void {
    if(this.folderForm.valid && this.folderForm.value !== this.folderData && this.folderForm.dirty) {
      this.statusSaveFolder = 'loading';
      const { name } = this.folderForm.getRawValue();
      this.folderService.updateFolder({ ...this.folderData, name })
      .pipe(finalize(() => takeUntilDestroyed(this.destroyRef)))
      .subscribe({
        next: (folder: Folder) => {
          this.userFolders$.update(folders => {
              folders.splice(folders.findIndex(f => f.id === folder.id), 1, folder);
              return folders
          })
          this.statusSaveFolder = 'success';
          this.folderDialogService.openSnackBar('Cambios guardados con éxito', 'Cerrar');
        },
        error: () => {
          this.statusSaveFolder = 'failed';
          this.folderDialogService.openSnackBar('No se pudieron guardar los cambios', 'Cerrar');
        }
      })
    } else {
      this.folderDialogService.openSnackBar('Cambios guardados con éxito', 'Cerrar');
    }
  }

  deleteFolder(id: number): void {
    this.statusDeleteFolder = 'loading';
    this.folderService.deleteFolder(id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (deletedFolder: Folder) => {
        this.userFolders$.update((folders) => {
          this.folderSelected$.update(() => folders.find(folder => folder.id != deletedFolder.id) || null);
          return folders.filter(folder => folder.id !== deletedFolder.id);
        });
        this.dialogRef.close();
        this.statusDeleteFolder = 'success';
        this.folderDialogService.openSnackBar('Carpeta eliminada con éxito', 'Cerrar');
      },
      error: () => {
        this.statusDeleteFolder = 'failed';
        this.folderDialogService.openSnackBar('No se pudo eliminar la carpeta', 'Cerrar');
      }
    })
  }

}
