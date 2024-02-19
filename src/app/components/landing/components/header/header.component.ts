import { Component, inject } from '@angular/core';
import { AuthDialogService } from '../../../../services/dialogs/auth-dialog.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private authDialog = inject(AuthDialogService)

  openRegister(): void {
    this.authDialog.openRegister();
  }
}
