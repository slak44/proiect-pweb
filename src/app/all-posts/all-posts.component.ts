import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostService } from '../base/services/post.service';
import { Observable } from 'rxjs';
import { Post } from '../base/models/post.model';

@Component({
  selector: 'pweb-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllPostsComponent {
  public readonly posts$: Observable<Post[]> = this.postService.getAllPosts();

  constructor(
    private readonly postService: PostService,
  ) {
  }
}
