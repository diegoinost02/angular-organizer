import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../../components/layout/components/profile/profile.component';
import { EditUserComponent } from '../../components/layout/components/profile/components/edit-user/edit-user.component';
import { UpdateUserDto, User } from '../../interfaces/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserDialogService {

  private dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  openUserDetails() {
    this.dialog.open(ProfileComponent, {
      height: 'auto', width: 'auto',
      backdropClass: "background-dialog"
    });
  }

  openEditUser(userId: number) {
    this.dialog.open(EditUserComponent, {
      data: userId,
      height: 'auto', width: 'auto'
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000})
  }
}
