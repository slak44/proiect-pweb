import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '../../../base/services/user.service';
import { Observable } from 'rxjs';
import { AppUser } from '../../../base/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserSettingsDialogComponent } from '../user-settings-dialog/user-settings-dialog.component';
import { CreatePostService } from '../../services/create-post.service';

interface SidenavRoute {
  name: string;
  icon: string;
  routerLink?: string;
  click?: () => void;
  isVisible$?: Observable<boolean>;
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
      routerLink: '/my-posts',
    },
    {
      name: 'All Posts',
      icon: 'event',
      routerLink: '/all-posts',
    },
    {
      name: 'Information',
      icon: 'info',
      click: () => window.location.href = 'https://ec.europa.eu/info/strategy/priorities-2019-2024/stronger-europe-world/eu-solidarity-ukraine/eu-assistance-ukraine/information-people-fleeing-war-ukraine_en',
    },
    {
      name: 'User Administration',
      icon: 'manage_accounts',
      routerLink: '/admin/user',
      isVisible$: this.userService.isCurrentUserAdmin$,
    },
  ];

  public readonly currentUser$: Observable<AppUser | null> = this.userService.currentUser$;
  public readonly showCreatePost$: Observable<boolean> = this.createPostService.showCreatePost$;

  constructor(
    private readonly userService: UserService,
    private readonly createPostService: CreatePostService,
    private readonly dialog: MatDialog,
  ) {
  }

  public openUserSettings(currentUser: AppUser): void {
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
