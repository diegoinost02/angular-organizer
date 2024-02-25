import { Component, DestroyRef, inject } from '@angular/core';
import { UserService } from '../../../../../../services/user.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RequestStatus } from '../../../../../../interfaces/request-status.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../../../../../interfaces/user.model';
import { UserDialogService } from '../../../../../../services/dialogs/user-dialog.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInput, MatIconModule, MatFormField, FormsModule, ReactiveFormsModule, MatProgressSpinner],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  private userId: number = inject(MAT_DIALOG_DATA);

  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private userDialogService = inject(UserDialogService)
  private user$ = this.userService.user$;
  protected valueToEdit = this.userService.valueToEdit;

  private dialogRef = inject(MatDialogRef);
  private destroyRef = inject(DestroyRef);

  hidePassword: boolean = true;
  hideNewPassword: boolean = true;
  status: RequestStatus = 'init';

  userForm = this.formBuilder.nonNullable.group({
    username: [this.user$()!.username, [Validators.required, Validators.maxLength(20)]],
    email:[this.user$()!.email, [Validators.required]],
    newPassword: [null, [Validators.required]],
    password: ['', [Validators.required]]
  })

  update(): void {
    if( this.userForm.value != this.user$() && this.userForm.dirty) {
      this.status = 'loading';
      const id = this.userId;
      const { username, email, newPassword, password } = this.userForm.getRawValue();
      this.userService.updateUser({ id , username, email, newPassword, password})
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user: User) => {
          this.user$.update(() => user);
          this.status = 'success';
          this.userDialogService.openSnackBar('Cambios guardados con éxito', 'Cerrar');
          this.dialogRef.close();

        },
        error: () => {
          this.status = 'failed';
          this.userDialogService.openSnackBar('No se pudieron guardar los cambios', 'Cerrar');
        }
      })
    }
    else {
      this.userDialogService.openSnackBar('Cambios guardados con éxito', 'Cerrar');
    }
  }

  verifyAndDelete(): void {
    if(this.userForm.controls.password.valid) {
      this.status = 'loading';
      const password  = this.userForm.getRawValue().password;
      this.userService.verifyPassword(this.userId, {password})
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user: User) => {
          this.deleteAccount()
        },
        error: () => {
          this.status = 'failed';
          this.userDialogService.openSnackBar('Contraseña incorrecta', 'Cerrar');
        }
      })
    }
  }
  deleteAccount(): void {
    this.status = 'loading';
    this.userService.deleteUser(this.userId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user: User) => {
          this.userService.logout();
          this.userDialogService.closeAllDialogs();
          this.userDialogService.openSnackBar('Cuenta eliminada con éxito', 'Cerrar');
          this.status = 'success';
        },
        error: () => {
          this.status = 'failed';
          this.userDialogService.openSnackBar('No se pudo eliminar la cuenta', 'Cerrar');
        }
      })
  }


  getUsernameErrorMessage() {
    if(this.userForm.controls.username.hasError('required')){
      return 'Debe ingresar un nombre de usuario';
    }
    if(this.userForm.controls.username.hasError('maxlength')){
      return 'Máximo de 20 caracteres';
    }
    return '';
  }

  getEmailErrorMessage() {
    if(this.userForm.controls.email.hasError('required')){
      return 'Debe ingresar un email';
    }
    if(this.userForm.controls.email.hasError('email')){
      return 'El email no es valido';
    }
    return '';
  }

  getNewPasswordErrorMessage() {
    return this.userForm.controls.newPassword.hasError('required') ? 'Debe ingresar una contraseña' : '';
  }

  getPasswordErrorMessage() {
    return this.userForm.controls.password.hasError('required') ? 'Debe ingresar una contraseña' : '';
  }
}
