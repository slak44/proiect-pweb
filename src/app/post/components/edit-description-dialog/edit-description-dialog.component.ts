import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Post } from '../../../base/models/post.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

export interface EditDescriptionData {
  post: Post;
  descriptionChanged: (newDesc: string) => void;
}

@Component({
  selector: 'pweb-edit-description-dialog',
  templateUrl: './edit-description-dialog.component.html',
  styleUrls: ['./edit-description-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDescriptionDialogComponent implements OnInit {
  public readonly newDescControl: FormControl = new FormControl('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditDescriptionData,
  ) {
  }

  public ngOnInit(): void {
    this.newDescControl.setValue(this.data.post.description);
  }

  public change(): void {
    this.data.descriptionChanged(this.newDescControl.value as string);
  }
}
