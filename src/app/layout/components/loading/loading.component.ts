import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pweb-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  constructor() {
  }
}
