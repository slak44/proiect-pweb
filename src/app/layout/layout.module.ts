import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateLayoutComponent } from './components/private-layout/private-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PrivateLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [RouterModule],
})
export class LayoutModule {
}
