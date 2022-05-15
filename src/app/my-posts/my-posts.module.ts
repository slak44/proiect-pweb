import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPostsComponent } from './my-posts.component';
import { MatDividerModule } from '@angular/material/divider';
import { PostModule } from '../post/post.module';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
    MyPostsComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    PostModule,
    MatTableModule,
    MatRippleModule,
  ],
})
export class MyPostsModule {
}
