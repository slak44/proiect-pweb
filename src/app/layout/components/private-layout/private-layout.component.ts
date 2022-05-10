import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pweb-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateLayoutComponent {
  constructor() {
  }
}
