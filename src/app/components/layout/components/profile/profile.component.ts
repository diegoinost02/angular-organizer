import { Component, inject } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { UserDialogService } from '../../../../services/dialogs/user-dialog.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatTooltip],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  private userDialogService = inject(UserDialogService);
  private userService = inject(UserService);
  user$ = this.userService.user$;

  editUsername() {
    this.userService.valueToEdit.update(() => 'username');
    this.openEdit();
  }

  editEmail() {
    this.userService.valueToEdit.update(() => 'email');
    this.openEdit();}

  changePassword() {
    this.userService.valueToEdit.update(() => 'password');
    this.openEdit();
  }

  deleteAccount() {
    this.userService.valueToEdit.update(() => 'delete');
    this.openEdit();
  }

  openEdit(){
    if(this.user$()!.id) {
      this.userDialogService.openEditUser(this.user$()!.id);
    }
  }

}
