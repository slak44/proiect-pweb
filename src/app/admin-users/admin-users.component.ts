import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '../base/services/user.service';
import { Observable } from 'rxjs';
import { AppUser } from '../base/models/user.model';

@Component({
  selector: 'pweb-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUsersComponent {
  public readonly users$: Observable<AppUser[]> = this.userService.getUserList();

  public readonly displayedColumns: string[] = ['user-id', 'username', 'email'];

  constructor(
    private readonly userService: UserService
  ) {
  }
}
