import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../base/models/post.model';
import { PostService } from '../base/services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, map, Observable } from 'rxjs';
import { UserService } from '../base/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditContentData, EditTextDialogComponent } from './components/edit-text-dialog/edit-text-dialog.component';
import { RetireDialogComponent } from './components/retire-dialog/retire-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { AddTagsDialogComponent } from './components/add-tags-dialog/add-tags-dialog.component';
import { categoryIcons, categoryNames, interactionCountTexts, interactionTexts, postTypeNames } from './post-texts';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { InteractionSheetComponent } from './components/interaction-sheet/interaction-sheet.component';

@Component({
  selector: 'pweb-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  @Input() public post!: Post;
  @Output() public deleted: EventEmitter<void> = new EventEmitter<void>();
  @Output() public updated: EventEmitter<Post> = new EventEmitter<Post>();

  public readonly isOwned$: Observable<boolean> = combineLatest([
    this.userService.currentUser$.pipe(
      map(currentUser => currentUser?.id === this.post.ownerId),
    ),
    this.userService.isCurrentUserAdmin$,
  ]).pipe(
    map(([isOwned, isAdmin]) => isOwned || isAdmin),
  );

  public readonly categoryIcons = categoryIcons;
  public readonly categoryNames = categoryNames;
  public readonly postTypeNames = postTypeNames;
  public readonly interactionTexts = interactionTexts;
  public readonly interactionCountTexts = interactionCountTexts;

  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly matSnackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    private readonly bottomSheet: MatBottomSheet,
  ) {
  }

  private editDescription(newDescription: string): void {
    this.postService.editDescription(this.post.id, newDescription).subscribe(() => {
      const newPost: Post = { ...this.post, description: newDescription };
      this.updated.emit(newPost);
    });
  }

  public tryEditDescription(): void {
    this.dialog.open<EditTextDialogComponent, EditContentData>(EditTextDialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        dialogTitle: 'Edit description',
        existingContent: this.post.description,
        hint: this.post.title,
        contentChanged: this.editDescription.bind(this)
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

      this.postService.retirePost(this.post.id).subscribe({
        next: () => {
          this.matSnackBar.open('Post retired', undefined, { duration: 3000 });
        },
      });
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

      this.postService.deletePost(this.post.id).subscribe({
        next: () => {
          this.deleted.emit();
          this.matSnackBar.open('Post deleted', undefined, { duration: 3000 });
        },
      });
    });
  }

  private addTags(addedTags: string[]): void {
    this.postService.addTags(this.post.id, addedTags).subscribe({
      next: () => {
        const newPost: Post = { ...this.post, tags: [...this.post.tags, ...addedTags] };
        this.updated.emit(newPost);

        const tagsText = addedTags.map(tag => `#${tag}`).join(', ');
        this.matSnackBar.open(`Tags added: ${tagsText}`, undefined, { duration: 3000 });
      },
    });
  }

  public tryAddTags(): void {
    const ref = this.dialog.open<AddTagsDialogComponent, unknown, string[]>(AddTagsDialogComponent, {
      width: '600px',
      maxWidth: '100vw',
    });

    ref.afterClosed().subscribe(addedTags => {
      if (!addedTags) {
        return;
      }

      this.addTags(addedTags);
    });
  }

  public removeTag(removed: string): void {
    this.postService.removeTag(this.post.id, removed).subscribe({
      next: () => {
        const newPost: Post = { ...this.post, tags: this.post.tags.filter(tag => tag !== removed) };
        this.updated.emit(newPost);

        this.matSnackBar.open(`Tag removed: #${removed}`, undefined, { duration: 3000 });
      },
    });
  }

  public interact(): void {
    this.bottomSheet.open<InteractionSheetComponent, unknown, boolean>(InteractionSheetComponent, {
      data: {
        type: this.post.type,
        postId: this.post.id,
      },
    }).afterDismissed().subscribe(didInteract => {
      if (didInteract) {
        const newPost: Post = { ...this.post, interactionCount: this.post.interactionCount + 1 };
        this.updated.emit(newPost);
      }
    });
  }

  public upvote(): void {
    this.postService.upvote(this.post.id).subscribe({
      next: () => {
        const newPost: Post = {
          ...this.post,
          upvotes: this.post.downvoted ? this.post.upvotes + 2 : this.post.upvotes + 1,
          upvoted: true,
          downvoted: false,
        };
        this.updated.emit(newPost);
      },
    });
  }

  public downvote(): void {
    this.postService.downvote(this.post.id).subscribe({
      next: () => {
        const newPost: Post = {
          ...this.post,
          upvotes: this.post.upvoted ? this.post.upvotes - 2 : this.post.upvotes - 1,
          downvoted: true,
          upvoted: false,
        };
        this.updated.emit(newPost);
      },
    });
  }
}
