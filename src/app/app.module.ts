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
import { AccountSettingsModule } from './account-settings/account-settings.module';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

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
    AccountSettingsModule,
    AdminUsersModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-vlziad43.eu.auth0.com',
      clientId: 'L8679lKaI2CFLXiJDsaJmmzTr39eBMqH',
      audience: 'https://dev-vlziad43.eu.auth0.com/api/v2/',
      scope: 'backend',
      httpInterceptor: {
        allowedList: [
          {
            uri: 'https://dev-vlziad43.eu.auth0.com/api/v2/*',
            tokenOptions: {
              audience: 'https://dev-vlziad43.eu.auth0.com/api/v2/',
              scope: 'backend',
            },
          },
          {
            uri: `${environment.baseUrl}/*`,
            tokenOptions: {
              audience: 'https://dev-vlziad43.eu.auth0.com/api/v2/',
              scope: 'backend',
            },
          },
        ],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
