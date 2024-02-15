import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit{

  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const username = params['username']; 
      this.userService.getProfile(username).subscribe()
    })
  }
}
