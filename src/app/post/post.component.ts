import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post, PostCategory, PostType, Tag } from '../base/models/post.model';
import { PostService } from '../base/services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { UserService } from '../base/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import {
  EditDescriptionData,
  EditDescriptionDialogComponent,
} from './components/edit-description-dialog/edit-description-dialog.component';
import { RetireDialogComponent } from './components/retire-dialog/retire-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { AddTagsDialogComponent } from './components/add-tags-dialog/add-tags-dialog.component';

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
    private readonly dialog: MatDialog,
  ) {
  }

  public editDescription(): void {
    this.dialog.open<EditDescriptionDialogComponent, EditDescriptionData>(EditDescriptionDialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        post: this.post,
        descriptionChanged: (newDesc: string) => {
          // FIXME
          void newDesc;
        },
      },
    });
  }

  public retire(): void {
    const ref = this.dialog.open<RetireDialogComponent, unknown, boolean>(RetireDialogComponent, {
      width: '300px',
      maxWidth: '100vw',
    });

    ref.afterClosed().subscribe(wasRetired => {
      if (!wasRetired) {
        return;
      }

      // FIXME retire
    });
  }

  public deletePost(): void {
    const ref = this.dialog.open<DeleteDialogComponent, unknown, boolean>(DeleteDialogComponent, {
      width: '400px',
      maxWidth: '100vw',
    });

    ref.afterClosed().subscribe(wasDeleted => {
      if (!wasDeleted) {
        return;
      }

      // FIXME delete
    });
  }

  public addTags(): void {
    const ref = this.dialog.open<AddTagsDialogComponent, unknown, string[]>(AddTagsDialogComponent, {
      width: '600px',
      maxWidth: '100vw',
    });

    ref.afterClosed().subscribe(addedTags => {
      if (!addedTags) {
        return;
      }

      // FIXME add tags
    });
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
}
