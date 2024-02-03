import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { AuthDialogService } from '../../../services/auth-dialog.service';
import { RequestStatus } from '../../../interfaces/request-status.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatIconModule, ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  private authDialog = inject(AuthDialogService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  private snackBar = inject(MatSnackBar);

  status: RequestStatus = 'init';
  hidePassword = true;

  loginForm = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  login(): void{
    if(this.loginForm.valid) {
      this.status = 'loading';
      const { username, password } = this.loginForm.getRawValue();
      this.authService.login(username, password).subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/home']);
          this.dialogRef.close();
        },
        error: () => {
          this.status = 'failed';
          this.openSnackBar('Usuario o contraseña incorrectos', 'Cerrar');
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  // login(): void{
  //   if(this.loginForm.valid) {
  //     this.status = 'loading';
  //     setTimeout(() => {
  //       const { username, password } = this.loginForm.getRawValue();
  //       this.authService.login(username, password).subscribe({
  //         next: () => {
  //           this.status = 'success';
  //           this.router.navigate(['/home']);
  //           this.dialogRef.close();
  //         },
  //         error: () => {
  //           this.status = 'failed';
  //         }
  //       })
  //     }, 2000);
  //   } else {
  //     this.loginForm.markAllAsTouched();
  //   }
  // }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  getUsernameErrorMessage() {
    return this.loginForm.controls.username.hasError('required') ? 'Debe ingresar un nombre de usuario' : '';
  }

  getPasswordErrorMessage() {
    return this.loginForm.controls.password.hasError('required') ? 'Debe ingresar una contraseña' : '';
  }

  openRegister(): void {
    this.dialogRef.close();
    this.authDialog.openRegister();
  }
}
