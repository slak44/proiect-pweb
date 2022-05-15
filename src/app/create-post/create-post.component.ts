import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreatePost, PostCategory, PostType } from '../base/models/post.model';
import { categoryIcons, categoryNames, postTypeNames } from '../post/post-texts';
import { CreatePostService } from '../layout/services/create-post.service';
import { FormControl } from '@angular/forms';
import { PostService } from '../base/services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'pweb-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePostComponent implements OnInit, OnDestroy {
  private readonly postTypeSubject: BehaviorSubject<PostType | null> = new BehaviorSubject<PostType | null>(null);

  public readonly postType$: Observable<PostType | null> = this.postTypeSubject;

  public readonly postTypeNames = postTypeNames;
  public readonly categoryNames = categoryNames;
  public readonly categoryIcons = categoryIcons;

  public readonly postType = PostType;
  public readonly postCategory = PostCategory;

  public readonly categoryControl: FormControl = new FormControl(PostCategory.MATERIALS);

  public createPostValue?: CreatePost;

  constructor(
    private readonly createPostService: CreatePostService,
    private readonly postService: PostService,
    private readonly matSnackBar: MatSnackBar,
    private readonly router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.createPostService.setShowCreatePost(false);
  }

  public ngOnDestroy(): void {
    this.createPostService.setShowCreatePost(true);
  }

  public selectPost(type: PostType): void {
    this.postTypeSubject.next(type);
  }

  public updateCreatePost(createPost: CreatePost): void {
    this.createPostValue = createPost;
  }

  public createPost(): void {
    void this.router.navigate(['/', 'loading']);
    this.postService.createPost(this.createPostValue!).subscribe({
      next: () => {
        this.matSnackBar.open('Post created', undefined, { duration: 3000 });
        void this.router.navigate(['/', 'dashboard']);
      },
    });
  }
}
