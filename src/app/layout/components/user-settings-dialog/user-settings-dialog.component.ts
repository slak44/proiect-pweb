import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AppUser } from '../../../base/models/user.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'pweb-user-settings-dialog',
  templateUrl: './user-settings-dialog.component.html',
  styleUrls: ['./user-settings-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsDialogComponent {
  constructor(
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public readonly user: AppUser,
  ) {
  }

  public openLogout(): void {
    this.dialog.open(LogoutDialogComponent);
  }
}
