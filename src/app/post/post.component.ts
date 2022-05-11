import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '../base/models/post.model';

@Component({
  selector: 'pweb-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  @Input() public post!: Post;

  constructor() {
  }
}
