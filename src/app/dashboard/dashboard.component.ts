import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '../base/services/user.service';
import { Observable, ReplaySubject, switchMap } from 'rxjs';
import { User } from '../base/models/user.model';
import { PostService } from '../base/services/post.service';
import { Post } from '../base/models/post.model';

@Component({
  selector: 'pweb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private readonly refreshLatestSubject: ReplaySubject<void> = new ReplaySubject<void>(1);

  public readonly currentUser$: Observable<User | null> = this.userService.currentUser$;

  public readonly latestPost$: Observable<Post> = this.refreshLatestSubject.pipe(
    switchMap(() => this.postService.getLatestPost()),
  );

  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {
  }

  public ngOnInit(): void {
    this.refreshLatestSubject.next();
  }

  public refreshLatestPost(): void {
    this.refreshLatestSubject.next();
  }
}
