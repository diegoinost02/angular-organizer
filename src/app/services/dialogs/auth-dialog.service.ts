import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../components/auth/register/register.component';
import { LoginComponent } from '../../components/auth/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthDialogService {

  private diaglog = inject(MatDialog);

  openRegister(): void {
    this.diaglog.open(RegisterComponent, {
      height: 'auto', width: 'auto',
      backdropClass: "background-dialog"
    });
  }

  openLogin(): void {
    this.diaglog.open(LoginComponent, {
      height: 'auto', width: 'auto',
      backdropClass: "background-dialog"
    });
  }
}
