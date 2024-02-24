import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../components/auth/register/register.component';
import { LoginComponent } from '../../components/auth/login/login.component';
import { EditUserComponent } from '../../components/layout/components/profile/components/edit-user/edit-user.component';

@Injectable({
  providedIn: 'root'
})
export class AuthDialogService {

  private dialog = inject(MatDialog);

  openRegister(): void {
    this.dialog.open(RegisterComponent, {
      height: 'auto', width: 'auto',
      backdropClass: "background-dialog-blur"
    });
  }

  openLogin(): void {
    this.dialog.open(LoginComponent, {
      height: 'auto', width: 'auto',
      backdropClass: "background-dialog-blur"
    });
  }
}
