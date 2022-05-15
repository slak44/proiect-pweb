import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PostService } from '../base/services/post.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../base/models/post.model';

@Component({
  selector: 'pweb-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllPostsComponent implements OnInit {
  private readonly postsSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

  public readonly posts$: Observable<Post[]> = this.postsSubject;

  constructor(
    private readonly postService: PostService,
  ) {
  }

  public ngOnInit(): void {
    this.postService.getAllPosts().subscribe(posts => this.postsSubject.next(posts));
  }

  public updatePost(updated: Post): void {
    const idx = this.postsSubject.value.findIndex((post) => post.id === updated.id);
    const newPosts = [...this.postsSubject.value];
    newPosts.splice(idx, 1, updated);
    this.postsSubject.next(newPosts);
  }

  public deletePost(deleted: Post): void {
    this.postsSubject.next(this.postsSubject.value.filter(post => post !== deleted));
  }
}
