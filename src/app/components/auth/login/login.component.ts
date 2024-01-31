import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private diaglog = inject(MatDialog);

  openRegister(): void {
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
