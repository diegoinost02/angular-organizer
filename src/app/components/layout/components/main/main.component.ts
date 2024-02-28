import { Component, OnInit, inject} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Folder } from '../../../../interfaces/folder.model';
import { NotesComponent } from '../notes/notes.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { FolderDialogService } from '../../../../services/dialogs/folder-dialog.service';
import { UserDialogService } from '../../../../services/dialogs/user-dialog.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatSidenavModule, NotesComponent, FooterComponent, CommonModule, OverlayModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

  private userService = inject(UserService);
  private folderDialogService = inject(FolderDialogService);
  private userDialogService = inject(UserDialogService);

  user$ = this.userService.user$;
  userFolders$ = this.userService.userFolders$;
  folderSelected$ = this.userService.folderSelected$;

  isOpenUserMenu: boolean = false;
  hideDrawer: boolean = false;
  isOver: boolean = false;

  ngOnInit(): void {
      if(window.innerWidth <= 750){
        this.hideDrawer = true;
        this.isOver = true;
      }
  }

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

  openProfile() {
    this.userDialogService.openUserDetails();
    this.isOpenUserMenu = false;
  }
  
  createFolder(){
    this.folderDialogService.openFolderForm(); 
  }

  openFolder(folder: Folder) {
    this.folderDialogService.openFolderDetails(folder);
    this.folderToOpenOverlay = -1;
  }
  
  singOff(){
    this.userService.logout();
  }
}
