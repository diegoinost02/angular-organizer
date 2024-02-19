import { Component, inject} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Folder } from '../../../../interfaces/folder.model';
import { NotesComponent } from '../notes/notes.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { FolderDialogService } from '../../../../services/dialogs/folder-dialog.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatSidenavModule, NotesComponent, FooterComponent, CommonModule, OverlayModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent{

  private userService = inject(UserService);
  private router = inject(Router);
  private folderDialogService = inject(FolderDialogService);

  user$ = this.userService.user$;
  userFolders$ = this.userService.userFolders$;
  folderSelected$ = this.userService.folderSelected$;

  isOpenUserMenu: boolean = false;

  folderToOpenOverlay: Number = -1;
  openFolderMenu(folderId: number) {
    this.folderToOpenOverlay = folderId;
  }

  selectFolder(folder: Folder) {
    this.userService.folderSelected$.update(() => folder);
  }

  closedFolder = "/assets/svg/folder.svg";
  openedFolder = "/assets/svg/opened-folder.svg";
  currentFolder: number | null = null;

  createFolder(){
    this.folderDialogService.openFolderForm(); 
  }

  openFolder(folder: Folder) {
    this.folderDialogService.openFolderDetails(folder);
  }
  
  singOff(){
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
