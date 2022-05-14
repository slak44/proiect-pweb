import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pweb-retire-dialog',
  templateUrl: './retire-dialog.component.html',
  styleUrls: ['./retire-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RetireDialogComponent {
  constructor() {
  }
}
