import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CreatePost, PostCategory, PostType } from '../../../base/models/post.model';
import { categoryIcons, categoryNames, postTypeNames } from '../../post-texts';
import { MatDialog } from '@angular/material/dialog';
import { AddTagsDialogComponent } from '../add-tags-dialog/add-tags-dialog.component';
import { EditContentData, EditTextDialogComponent } from '../edit-text-dialog/edit-text-dialog.component';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'pweb-post-builder',
  templateUrl: './post-builder.component.html',
  styleUrls: ['./post-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostBuilderComponent implements OnInit {
  @ViewChild('fileInput') private readonly fileInput!: ElementRef<HTMLInputElement>;

  @Input() public type!: PostType;
  @Input() public category!: PostCategory;
  @Output() public postCompleted: EventEmitter<CreatePost> = new EventEmitter<CreatePost>();

  public readonly categoryIcons = categoryIcons;
  public readonly categoryNames = categoryNames;
  public readonly postTypeNames = postTypeNames;

  public imageUrl?: SafeUrl;

  private readonly createPostSubject: BehaviorSubject<Partial<CreatePost>> = new BehaviorSubject({});

  public readonly createPost$: Observable<Partial<CreatePost>> = this.createPostSubject.pipe(
    tap(partialPost => {
      if (partialPost.description && partialPost.title) {
        this.postCompleted.emit(partialPost as CreatePost);
      }
    })
  );

  constructor(
    private readonly dialog: MatDialog,
    private readonly sanitizer: DomSanitizer,
  ) {
  }

  public ngOnInit(): void {
    this.createPostSubject.next({
      type: this.type,
      category: this.category,
      tags: [],
    });
  }

  public removeTag(tag: string): void {
    this.createPostSubject.next({
      ...this.createPostSubject.value,
      tags: this.createPostSubject.value.tags!.filter(currentTag => currentTag !== tag),
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

      this.createPostSubject.next({
        ...this.createPostSubject.value,
        tags: [...this.createPostSubject.value.tags!, ...addedTags],
      });
    });
  }

  public editTitle(): void {
    this.dialog.open<EditTextDialogComponent, EditContentData>(EditTextDialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        dialogTitle: 'Edit title',
        existingContent: this.createPostSubject.value.title || '',
        hint: '',
        contentChanged: (newContent: string) => {
          this.createPostSubject.next({
            ...this.createPostSubject.value,
            title: newContent,
          });
        },
      },
    });
  }

  public editDescription(): void {
    this.dialog.open<EditTextDialogComponent, EditContentData>(EditTextDialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        dialogTitle: 'Edit description',
        existingContent: this.createPostSubject.value.description || '',
        hint: this.createPostSubject.value.title || '',
        contentChanged: (newContent: string) => {
          this.createPostSubject.next({
            ...this.createPostSubject.value,
            description: newContent,
          });
        },
      },
    });
  }

  public addImage(): void {
    this.fileInput.nativeElement.click();
  }

  public onImageAdded(): void {
    const file = this.fileInput.nativeElement.files![0];
    this.createPostSubject.next({
      ...this.createPostSubject.value,
      image: file
    });
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }
}
