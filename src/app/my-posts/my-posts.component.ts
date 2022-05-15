import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PostService } from '../base/services/post.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Interaction, OwnedPost, Post, PostType } from '../base/models/post.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { InteractionDataSheetComponent } from './components/interaction-data-sheet/interaction-data-sheet.component';

@Component({
  selector: 'pweb-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyPostsComponent implements OnInit {
  private readonly myPostsSubject: BehaviorSubject<OwnedPost[]> = new BehaviorSubject<OwnedPost[]>([]);

  public readonly myPosts$: Observable<OwnedPost[]> = this.myPostsSubject;

  public readonly tableTexts: Record<PostType, string> = {
    [PostType.OFFER]: 'Contributors',
    [PostType.REQUEST]: 'Accepted By',
  };

  public readonly displayedColumns: string[] = ['name', 'phone', 'text'];

  constructor(
    private readonly postService: PostService,
    private readonly bottomSheet: MatBottomSheet,
  ) {
  }

  public ngOnInit(): void {
    this.postService.getMyPosts().subscribe(myPosts => this.myPostsSubject.next(myPosts));
  }

  public openInteraction(interaction: Interaction, type: PostType): void {
    this.bottomSheet.open(InteractionDataSheetComponent, { data: { interaction, type } });
  }

  public updatePost(updated: OwnedPost): void {
    const idx = this.myPostsSubject.value.findIndex((post) => post.id === updated.id);
    const newPosts = [...this.myPostsSubject.value];
    newPosts.splice(idx, 1, updated);
    this.myPostsSubject.next(newPosts);
  }

  public deletePost(deleted: Post): void {
    this.myPostsSubject.next(this.myPostsSubject.value.filter(post => post !== deleted));
  }
}
