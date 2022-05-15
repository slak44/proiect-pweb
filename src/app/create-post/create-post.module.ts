import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post.component';
import { MatDividerModule } from '@angular/material/divider';
import { LargeButtonComponent } from './components/large-button/large-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreatePostComponent,
    LargeButtonComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatRippleModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
})
export class CreatePostModule { }
