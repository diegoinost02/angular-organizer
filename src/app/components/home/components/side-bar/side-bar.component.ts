import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Folder } from '../../../../interfaces/folder.model';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  showFiller = false;


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
