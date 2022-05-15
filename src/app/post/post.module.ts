import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { EditTextDialogComponent } from './components/edit-text-dialog/edit-text-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { RetireDialogComponent } from './components/retire-dialog/retire-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { AddTagsDialogComponent } from './components/add-tags-dialog/add-tags-dialog.component';
import { PostBuilderComponent } from './components/post-builder/post-builder.component';
import { MatRippleModule } from '@angular/material/core';
import { InteractionSheetComponent } from './components/interaction-sheet/interaction-sheet.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

@NgModule({
  declarations: [
    PostComponent,
    EditTextDialogComponent,
    RetireDialogComponent,
    DeleteDialogComponent,
    AddTagsDialogComponent,
    PostBuilderComponent,
    InteractionSheetComponent,
  ],
  exports: [
    PostComponent,
    PostBuilderComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatBottomSheetModule,
  ],
})
export class PostModule {
}
