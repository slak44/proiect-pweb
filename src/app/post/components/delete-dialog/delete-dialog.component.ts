import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pweb-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialogComponent {
  constructor() {
  }
}
