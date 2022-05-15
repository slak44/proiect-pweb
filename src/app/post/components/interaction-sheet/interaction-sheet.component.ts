import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CreateInteraction, PostType } from '../../../base/models/post.model';
import { interactionCountTexts, interactionTexts, postTypeNames } from '../../post-texts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../base/services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'pweb-interaction-sheet',
  templateUrl: './interaction-sheet.component.html',
  styleUrls: ['./interaction-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractionSheetComponent {
  public readonly titles: Record<PostType, string> = {
    [PostType.OFFER]: 'Accept offer',
    [PostType.REQUEST]: 'Contribute to request',
  };

  public readonly placeholders: Record<PostType, string> = {
    [PostType.OFFER]: 'Add details so the offerer can best help you.',
    [PostType.REQUEST]: 'Tell the requester how you will contribute.',
  };

  public readonly interactionTexts = interactionTexts;

  public readonly interactionForm: FormGroup = this.formBuilder.group({
    phone: [''],
    text: ['', Validators.required],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly postService: PostService,
    private readonly matSnackBar: MatSnackBar,
    private readonly bottomSheetRef: MatBottomSheetRef<InteractionSheetComponent, boolean>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { postId: number; type: PostType },
  ) {
  }

  public submitInteraction(): void {
    const interaction = this.interactionForm.value as CreateInteraction;

    this.postService.interact(this.data.postId, interaction).subscribe({
      next: () => {
        this.bottomSheetRef.dismiss();
        const msg = `${postTypeNames[this.data.type]} ${interactionCountTexts[this.data.type]}`;
        this.matSnackBar.open(msg, undefined, { duration: 3000 });
      },
    });
  }
}
