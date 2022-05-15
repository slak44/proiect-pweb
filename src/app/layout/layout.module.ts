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
import { LogoutDialogComponent } from './components/logout-dialog/logout-dialog.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    PrivateLayoutComponent,
    UserSettingsDialogComponent,
    LogoutDialogComponent,
    LoadingComponent,
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
    MatProgressBarModule,
  ],
  exports: [RouterModule],
})
export class LayoutModule {
}
