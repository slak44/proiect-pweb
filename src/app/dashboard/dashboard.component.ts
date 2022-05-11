import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '../base/services/user.service';
import { Observable } from 'rxjs';
import { User } from '../base/models/user.model';
import { PostService } from '../base/services/post.service';
import { Post } from '../base/models/post.model';

@Component({
  selector: 'pweb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public readonly currentUser$: Observable<User | null> = this.userService.currentUser$;

  public readonly latestPost$: Observable<Post> = this.postService.getLatestPost();

  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService
  ) {
  }
}
