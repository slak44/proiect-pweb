import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { User } from '../../../base/models/user.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'pweb-user-settings-dialog',
  templateUrl: './user-settings-dialog.component.html',
  styleUrls: ['./user-settings-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly user: User,
  ) {
  }
}
