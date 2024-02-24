import { Component, inject } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatTooltip],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  private userService = inject(UserService);
  user$ = this.userService.user$;

  editUsername() {}

  changePassword() {}
}
