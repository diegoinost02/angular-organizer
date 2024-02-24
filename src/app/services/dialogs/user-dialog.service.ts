import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../../components/layout/components/profile/profile.component';

@Injectable({
  providedIn: 'root'
})
export class UserDialogService {

  private dialog = inject(MatDialog);

  openUserDetails() {
    this.dialog.open(ProfileComponent, {
      height: 'auto', width: 'auto',
      backdropClass: "background-dialog"
    });
  }
}
