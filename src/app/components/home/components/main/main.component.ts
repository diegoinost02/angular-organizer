import { Component, OnInit, inject} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Folder } from '../../../../interfaces/folder.model';
import { NotesComponent } from '../notes/notes.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { User, UserModel } from '../../../../interfaces/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatSidenavModule, NotesComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

  user: UserModel = new UserModel();
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.user.username = params['username'];
    })
  }


  folders: Folder[] = [
    {
      id: 1,
      name: "Todas las notas",
      notes: [],
      userId: 1
    },
    {
      id: 2,
      name: "Compras",
      notes: [],
      userId: 1
    },
    {
      id: 3,
      name: "Tareas",
      notes: [],
      userId: 1
    },
    {
      id: 4,
      name: "Programación",
      notes: [],
      userId: 1
    },
    {
      id: 5,
      name: "Universidad",
      notes: [],
      userId: 1
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
