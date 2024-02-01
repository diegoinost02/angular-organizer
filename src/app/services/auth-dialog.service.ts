import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../components/auth/register/register.component';
import { LoginComponent } from '../components/auth/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthDialogService {

  private diaglog = inject(MatDialog);

  openRegister(): void {
    const dialogRef = this.diaglog.open(RegisterComponent, {
      data: { name: 'test' },
      height: 'auto', width: 'auto',
      backdropClass: "background-dialog"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

  openLogin(): void {
    const dialogRef = this.diaglog.open(LoginComponent, {
      data: { name: 'test' },
      height: 'auto', width: 'auto',
      backdropClass: "background-dialog"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }
}
