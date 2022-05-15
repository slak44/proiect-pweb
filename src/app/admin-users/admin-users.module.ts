import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersComponent } from './admin-users.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    AdminUsersComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatTableModule,
    MatRippleModule,
    AppRoutingModule,
  ],
})
export class AdminUsersModule { }
