import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPostsComponent } from './my-posts.component';
import { MatDividerModule } from '@angular/material/divider';
import { PostModule } from '../post/post.module';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { InteractionDataSheetComponent } from './components/interaction-data-sheet/interaction-data-sheet.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    MyPostsComponent,
    InteractionDataSheetComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    PostModule,
    MatTableModule,
    MatRippleModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class MyPostsModule {
}
