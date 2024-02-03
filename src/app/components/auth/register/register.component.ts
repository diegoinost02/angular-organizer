import {Component, inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { AuthDialogService } from '../../../services/auth-dialog.service';
import { CustomValidators } from '../../../utils/validators';
import { RequestStatus } from '../../../interfaces/request-status.model';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatIconModule, ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)

  private authDialog = inject(AuthDialogService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  private snackBar = inject(MatSnackBar);

  status: RequestStatus = 'init';
  hidePassword = true;
  hideConfirmPassword = true;

  registerForm = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  },{
    validators: [ CustomValidators.passwordMatch('password', 'confirmPassword')]
  })

  register(): void{
    if (this.registerForm.valid) {
      this.status = 'loading'
      const { username, email, password } = this.registerForm.getRawValue();
      this.authService.registerAndLogin(username, email, password).subscribe({
        next: () =>{
          this.status = 'success';
          this.router.navigate(['/home'])
          this.dialogRef.close();
        },
        error: () => {
          this.status = 'failed';
          this.openSnackBar('Error al registrar el usuario', 'Cerrar')
        }}
      )
    } else {
      if (this.registerForm.controls.password.value !== this.registerForm.controls.confirmPassword.value) {
        this.openSnackBar('Las contraseñas no coinciden', 'Cerrar')
      }
      this.registerForm.markAllAsTouched();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  getEmailErrorMessage() {
    if (this.registerForm.controls.email.hasError('required')) {
      return 'Debe ingresar un email';
    }
    return this.registerForm.controls.email.hasError('email') ? 'El email no es valido' : '';
  }

  getUsernameErrorMessage() {
    return this.registerForm.controls.username.hasError('required') ? 'Debe ingresar un nombre de usuario' : '';
  }

  getPasswordErrorMessage() {
    return this.registerForm.controls.password.hasError('required') ? 'Debe ingresar una contraseña' : '';
  }
  getConfirmPasswordErrorMessage() {
    return this.registerForm.controls.confirmPassword.hasError('required') ? 'Debe confirmar la contraseña' : '';
  }

  openLogin(): void {
    this.dialogRef.close();
    this.authDialog.openLogin();
  }
}
