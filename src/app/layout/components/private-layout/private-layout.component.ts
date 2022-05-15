import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '../../../base/services/user.service';
import { Observable, tap } from 'rxjs';
import { User } from '../../../base/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserSettingsDialogComponent } from '../user-settings-dialog/user-settings-dialog.component';
import { CreatePostService } from '../../services/create-post.service';

interface SidenavRoute {
  name: string;
  icon: string;
  routerLink: string;
}

@Component({
  selector: 'pweb-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateLayoutComponent {
  public readonly routes: SidenavRoute[] = [
    {
      name: 'Dashboard',
      icon: 'assessment',
      routerLink: '/dashboard',
    },
    {
      name: 'My Posts',
      icon: 'calendar_today',
      routerLink: 'TODO',
    },
    {
      name: 'All Posts',
      icon: 'event',
      routerLink: 'all-posts',
    },
    {
      name: 'Recent Posts',
      icon: 'event_repeat',
      routerLink: 'TODO',
    },
    {
      name: 'Information',
      icon: 'info',
      routerLink: 'TODO',
    },
  ];

  public readonly currentUser$: Observable<User | null> = this.userService.currentUser$;
  public readonly showCreatePost$: Observable<boolean> = this.createPostService.showCreatePost$;

  constructor(
    private readonly userService: UserService,
    private readonly createPostService: CreatePostService,
    private readonly dialog: MatDialog,
  ) {
  }

  public openUserSettings(currentUser: User): void {
    this.dialog.open(UserSettingsDialogComponent, {
      width: '400px',
      data: currentUser,
      closeOnNavigation: true,
      backdropClass: 'transparent-backdrop',
      panelClass: 'no-padding',
      position: {
        top: '0',
        right: '0',
      },
    });
  }
}
