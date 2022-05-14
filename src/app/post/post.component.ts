import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post, PostCategory, PostType, Tag } from '../base/models/post.model';
import { PostService } from '../base/services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { UserService } from '../base/services/user.service';

@Component({
  selector: 'pweb-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  @Input() public post!: Post;

  public readonly isOwned$: Observable<boolean> = this.userService.currentUser$.pipe(
    map(currentUser => currentUser?.id === this.post.ownerId),
  );

  public readonly categoryIcons: Record<PostCategory, string> = {
    [PostCategory.FOOD]: 'fastfood',
    [PostCategory.SHELTER]: 'cabin',
    [PostCategory.MATERIALS]: 'inventory_2',
  };

  public readonly categoryNames: Record<PostCategory, string> = {
    [PostCategory.FOOD]: 'Food',
    [PostCategory.SHELTER]: 'Shelter',
    [PostCategory.MATERIALS]: 'Materials',
  };

  public readonly postTypeNames: Record<PostType, string> = {
    [PostType.OFFER]: 'Offer',
    [PostType.REQUEST]: 'Request',
  };

  public readonly interactionTexts: Record<PostType, string> = {
    [PostType.OFFER]: 'Accept',
    [PostType.REQUEST]: 'Contribute',
  };

  public readonly interactionCountTexts: Record<PostType, string> = {
    [PostType.OFFER]: 'accepted',
    [PostType.REQUEST]: 'contributors',
  };

  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly matSnackBar: MatSnackBar,
  ) {
  }

  public removeTag(tag: Tag): void {
    this.postService.removeTag(this.post.id, tag.id).subscribe({
      next: () => {
        const ref = this.matSnackBar.open(`Tag removed: #${tag.text}`, 'UNDO');
        ref.onAction().subscribe(() => {
          // FIXME
        });
      },
    });
  }

  public interact(): void {
    // FIXME
  }

  public upvote(): void {
    // FIXME
  }

  public downvote(): void {
    // FIXME
  }

  public addTags(): void {
    // FIXME
  }
}
