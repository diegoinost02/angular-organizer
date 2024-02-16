import { Component, OnInit, inject} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Folder } from '../../../../interfaces/folder.model';
import { NotesComponent } from '../notes/notes.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { FolderService } from '../../../../services/folder.service';
import { NoteService } from '../../../../services/note.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatSidenavModule, NotesComponent, FooterComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

  private userService = inject(UserService);
  private folderService = inject(FolderService);
  private noteService = inject(NoteService);

  user$ = this.userService.user$;
  userFolders$ = this.folderService.userFolders$;

  ngOnInit(): void {
      this.folderService.folderSelected.update(() => this.userFolders$()[0]);
  }
  selectFolder(folder: Folder) {
    this.folderService.folderSelected.update(() => folder);
    this.noteService.getNotesByFolderIdAndStatus(this.folderService.folderSelected()!.id, true).subscribe();
  }

  closedFolder = "/assets/svg/folder.svg";
  openedFolder = "/assets/svg/opened-folder.svg";
  currentFolder: number = -1;
}
