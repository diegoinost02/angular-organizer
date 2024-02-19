import { Component, DestroyRef, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../services/user.service';
import { FolderService } from '../../../../services/folder.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestStatus } from '../../../../interfaces/request-status.model';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { CreateFolderDto, Folder } from '../../../../interfaces/folder.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FolderDialogService } from '../../../../services/dialogs/folder-dialog.service';

@Component({
  selector: 'app-folder-form',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, MatTooltip],
  templateUrl: './folder-form.component.html',
  styleUrl: './folder-form.component.css'
})
export class FolderFormComponent {

  private userService = inject(UserService);
  private folderService = inject(FolderService);
  private folderDialogService = inject(FolderDialogService)
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef);
  private destroyRef = inject(DestroyRef);

  user$ = this.userService.user$;
  userFolders$ = this.userService.userFolders$;

  folderForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(50)]]
  })

  statusCreateFolder: RequestStatus = 'init'

  createFolder(): void {
    if((this.folderForm.valid)){
      this.statusCreateFolder = 'loading';
      const { name } = this.folderForm.getRawValue();
      const folder: CreateFolderDto = {
        name: name,
        user: this.user$()!
      };
      this.folderService.createFolder(folder)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (folder: Folder) => {
          this.userFolders$.update(folders => {
              folders.unshift(folder);
              return folders
          })
          this.dialogRef.close();
          this.statusCreateFolder = 'success';
          this.folderDialogService.openSnackBar('Nota creada con éxito', 'Cerrar');
        },
        error: () => {
          this.statusCreateFolder = 'failed';
          this.folderDialogService.openSnackBar('Ha ocurrido un error', 'Cerrar');
        }
      })
    } else {
      this.folderDialogService.openSnackBar('La nota no es valida', 'Cerrar');
    }
  }
}
