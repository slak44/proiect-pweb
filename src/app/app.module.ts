import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { MatButtonModule } from '@angular/material/button';
import { DashboardModule } from './dashboard/dashboard.module';
import { AllPostsModule } from './all-posts/all-posts.module';
import { CreatePostModule } from './create-post/create-post.module';
import { MyPostsModule } from './my-posts/my-posts.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    DashboardModule,
    MatButtonModule,
    AllPostsModule,
    CreatePostModule,
    MyPostsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
