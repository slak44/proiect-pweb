import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostService } from '../base/services/post.service';
import { Observable } from 'rxjs';
import { Interaction, OwnedPost, PostType } from '../base/models/post.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'pweb-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyPostsComponent {
  public readonly myPosts$: Observable<OwnedPost[]> = this.postService.getMyPosts();

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

  public openInteraction(interaction: Interaction): void {

  }
}
