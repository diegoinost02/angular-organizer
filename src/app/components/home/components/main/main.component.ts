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
      name: "Todas las notas",
      notes: []
    },
    {
      id: 2,
      name: "Compras",
      notes: []
    },
    {
      id: 3,
      name: "Tareas",
      notes: []
    },
    {
      id: 4,
      name: "Programación",
      notes: []
    },
    {
      id: 5,
      name: "Universidad",
      notes: []
    }
  ];

  // images: string[] = [
  //   "/assets/svg/folder.svg",
  //   "/assets/svg/folder.svg",
  //   "/assets/svg/folder.svg",
  //   "/assets/svg/folder.svg",
  //   "/assets/svg/folder.svg"
  // ];
  
  // image: string = "/assets/svg/folder.svg";
  closedFolder = "/assets/svg/folder.svg";
  openedFolder = "/assets/svg/opened-folder.svg";
  currentFolder: number = -1;
}
