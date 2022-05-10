import { ChangeDetectionStrategy, Component } from '@angular/core';

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
      routerLink: 'TODO',
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

  constructor() {
  }
}
