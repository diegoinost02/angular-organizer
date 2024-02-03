import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Folder } from '../../../../interfaces/folder.model';
import { NotesComponent } from '../notes/notes.component';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatSidenavModule, NotesComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  folders: Folder[] = [
    {
      id: 1,
      name: "Carpeta 1",
      notes: []
    },
    {
      id: 2,
      name: "Carpeta 2",
      notes: []
    },
    {
      id: 3,
      name: "Carpeta 3",
      notes: []
    },
    {
      id: 4,
      name: "Carpeta 4",
      notes: []
    },
    {
      id: 5,
      name: "Carpeta 5",
      notes: []
    }
  ];

  images: string[] = [
    "/assets/svg/folder.svg",
    "/assets/svg/folder.svg",
    "/assets/svg/folder.svg",
    "/assets/svg/folder.svg",
    "/assets/svg/folder.svg"
  ];
  
  closedFolder = "/assets/svg/folder.svg";
  openedFolder = "/assets/svg/opened-folder.svg";
}
