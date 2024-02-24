import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FolderService } from '../../services/folder.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const username = params['username']; 
      this.userService.getProfile(username)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          if(user) {
            this.folderService.getUserFolders(user.id).subscribe();
          }
        },
        error: () => {
            this.userService.logout();
        }
      })
    })
  }
}