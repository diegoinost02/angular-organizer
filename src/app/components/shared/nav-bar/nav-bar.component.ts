import { Component, inject } from '@angular/core';
import { AuthDialogService } from '../../../services/dialogs/auth-dialog.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  private authDialog = inject(AuthDialogService);

  openRegister(): void {
    this.authDialog.openRegister();
  }
  openLogin(): void {
    this.authDialog.openLogin();
  }
}