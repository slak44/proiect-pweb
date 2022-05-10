import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '../../../base/services/user.service';

@Component({
  selector: 'pweb-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutDialogComponent {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  public logout(): void {
    this.userService.logout();
  }
}
