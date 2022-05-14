import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'pweb-add-tags-dialog',
  templateUrl: './add-tags-dialog.component.html',
  styleUrls: ['./add-tags-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTagsDialogComponent {
  public readonly tagsControl: FormControl = new FormControl('');

  constructor(
    private readonly dialogRef: MatDialogRef<AddTagsDialogComponent, string[]>,
  ) {
  }

  public addTags(): void {
    const tags = (this.tagsControl.value as string).split(',').map(tag => tag.trim());

    this.dialogRef.close(tags);
  }
}
