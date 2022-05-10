import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateLayoutComponent } from './components/private-layout/private-layout.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserSettingsDialogComponent } from './components/user-settings-dialog/user-settings-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    PrivateLayoutComponent,
    UserSettingsDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatRippleModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
  ],
  exports: [RouterModule],
})
export class LayoutModule {
}
