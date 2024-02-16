import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FolderService } from '../../services/folder.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit{

  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private folderService = inject(FolderService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const username = params['username']; 
      this.userService.getProfile(username).subscribe( user => {
          if(user) {
            this.folderService.getUserFolders(user.id).subscribe();
          }
        }
      )
    })
  }
}