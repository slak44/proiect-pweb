import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPostsComponent } from './all-posts.component';
import { MatDividerModule } from '@angular/material/divider';
import { PostModule } from '../post/post.module';

@NgModule({
  declarations: [
    AllPostsComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    PostModule,
  ],
})
export class AllPostsModule {
}
