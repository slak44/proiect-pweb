import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Interaction, PostType } from '../../../base/models/post.model';
import { InteractionSheetComponent } from '../../../post/components/interaction-sheet/interaction-sheet.component';

@Component({
  selector: 'pweb-interaction-data-sheet',
  templateUrl: './interaction-data-sheet.component.html',
  styleUrls: ['./interaction-data-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractionDataSheetComponent {
  public readonly titleTexts: Record<PostType, string> = {
    [PostType.OFFER]: '\'s response to your request',
    [PostType.REQUEST]: '\'s response to your offer',
  };

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { interaction: Interaction; type: PostType },
    private readonly bottomSheetRef: MatBottomSheetRef<InteractionSheetComponent>,
  ) {
  }

  public dismiss(): void {
    this.bottomSheetRef.dismiss();
  }
}
