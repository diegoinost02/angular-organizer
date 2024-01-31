import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../auth/register/register.component';
import { LoginComponent } from '../../auth/login/login.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  private diaglog = inject(MatDialog);

  openRegister(): void {
    const dialogRef = this.diaglog.open(RegisterComponent, {
      data: { name: 'test' },
      height: 'auto', width: '350px',
      backdropClass: "background-dialog"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

  openLogin(): void {
    const dialogRef = this.diaglog.open(LoginComponent, {
      data: { name: 'test' },
      height: 'auto', width: '350px',
      backdropClass: "background-dialog"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }
}