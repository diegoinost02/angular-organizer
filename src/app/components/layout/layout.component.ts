import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FolderService } from '../../services/folder.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RequestStatus } from '../../interfaces/request-status.model';

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

  userRequestStatus = this.userService.userRequestStatus;
  foldersRequestStatus = this.userService.foldersRequestStatus;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const username = params['username']; 
      this.userRequestStatus.update(() => 'loading');
      this.userService.getProfile(username)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          if(user) {
            this.getFolders(user.id);
            this.userRequestStatus.update(() => 'success');
          } else {
            this.userRequestStatus.update(() => 'failed');
            this.userService.logout();
          }
        },
        error: () => {
            this.userService.logout();
            this.userRequestStatus.update(() => 'failed');
        }
      })
    })
  }

  getFolders(userId: number): void {
    this.foldersRequestStatus.update(() => 'loading');
    this.folderService.getUserFolders(userId).subscribe({
      next: () => {
        this.foldersRequestStatus.update(() => 'success');
      },
      error: () => {
        this.foldersRequestStatus.update(() => 'failed');
      }
    });
  }
}