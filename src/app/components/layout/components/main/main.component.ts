import { Component, inject} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Folder } from '../../../../interfaces/folder.model';
import { NotesComponent } from '../notes/notes.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { FolderService } from '../../../../services/folder.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatSidenavModule, NotesComponent, FooterComponent, CommonModule, OverlayModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent{

  private userService = inject(UserService);
  private folderService = inject(FolderService);
  private router = inject(Router)

  user$ = this.userService.user$;
  userFolders$ = this.folderService.userFolders$;
  folderSelected$ = this.folderService.folderSelected$;

  isOpenUserMenu: boolean = false;

  selectFolder(folder: Folder) {
    this.folderService.folderSelected$.update(() => folder);
  }

  closedFolder = "/assets/svg/folder.svg";
  openedFolder = "/assets/svg/opened-folder.svg";
  currentFolder: number = -1;
  
  singOff(){
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
