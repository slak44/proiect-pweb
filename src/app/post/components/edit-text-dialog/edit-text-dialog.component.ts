import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

export interface EditContentData {
  dialogTitle: string;
  hint: string;
  existingContent: string;
  contentChanged: (newContent: string) => void;
}

@Component({
  selector: 'pweb-edit-text-dialog',
  templateUrl: './edit-text-dialog.component.html',
  styleUrls: ['./edit-text-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTextDialogComponent implements OnInit {
  public readonly newContentControl: FormControl = new FormControl('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditContentData,
  ) {
  }

  public ngOnInit(): void {
    this.newContentControl.setValue(this.data.existingContent);
  }

  public change(): void {
    this.data.contentChanged(this.newContentControl.value as string);
  }
}
