import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'pweb-large-button',
  templateUrl: './large-button.component.html',
  styleUrls: ['./large-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LargeButtonComponent {
  @Input() public icon!: string;

  constructor() {
  }
}
