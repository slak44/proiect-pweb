import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateLayoutComponent } from './layout/components/private-layout/private-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { LoadingComponent } from './layout/components/loading/loading.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'all-posts',
        component: AllPostsComponent,
      },
      {
        path: 'my-posts',
        component: MyPostsComponent,
      },
      {
        path: 'create-post',
        component: CreatePostComponent,
      },
      {
        path: 'loading',
        component: LoadingComponent,
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
      },
      {
        path: 'admin/user',
        children: [
          {
            path: '',
            component: AdminUsersComponent,
          },
          {
            path: ':userId',
            component: AccountSettingsComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
