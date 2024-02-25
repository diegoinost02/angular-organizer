import {Component, DestroyRef, inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { AuthDialogService } from '../../../services/dialogs/auth-dialog.service';
import { CustomValidators } from '../../../utils/validators';
import { RequestStatus } from '../../../interfaces/request-status.model';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBar} from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private router = inject(Router);

  private authDialog = inject(AuthDialogService);
  private dialogRef = inject(MatDialogRef);
  private destroyRef = inject(DestroyRef);
  private snackBar = inject(MatSnackBar);

  status: RequestStatus = 'init';
  hidePassword = true;
  hideConfirmPassword = true;

  registerForm = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required, Validators.maxLength(20)]],
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
      this.authService.registerAndLogin(username, email, password)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () =>{
          this.status = 'success';
          this.router.navigate([`/${username}`]);
          this.dialogRef.close();
        },
        error: (err) => {
          console.error(err);
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
    if(this.registerForm.controls.email.hasError('required')){
      return 'Debe ingresar un email';
    }
    if(this.registerForm.controls.email.hasError('email')){
      return 'El email no es valido';
    }
    return '';
  }

  getUsernameErrorMessage() {
    if(this.registerForm.controls.username.hasError('required')){
      return 'Debe ingresar un nombre de usuario';
    }
    if(this.registerForm.controls.username.hasError('maxlength')){
      return 'Máximo de 20 caracteres';
    }
    return '';
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
