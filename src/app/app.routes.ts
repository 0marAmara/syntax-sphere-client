import {Routes} from '@angular/router';
import {LoginComponent} from '@app/features/auth/login/login.component';
import {SignupComponent} from '@app/features/auth/signup/signup.component';
import {AuthLayoutComponent} from '@shared/auth-layout/auth-layout.component';
import {BaseLayoutComponent} from '@shared/base-layout/base-layout.component';
import {PostsPageComponent} from '@app/features/posts/posts-page/posts-page.component';
import {authGuardFunction} from '@guards/auth-guard.function';
import {appGuardFunction} from '@guards/app-guard.function';
import {PostPageComponent} from '@app/features/post/post-page/post-page.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivateChild: [authGuardFunction],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      }
    ],
  },
  {
    path: '',
    component: BaseLayoutComponent,
    canActivateChild: [appGuardFunction],
    children: [
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full',
      },
      {
        path: 'posts',
        component: PostsPageComponent,
      },
      {
        path: 'posts/:id',
        component: PostPageComponent,
      },
      {
        path: 'search/:page',
        component: PostsPageComponent,
      },
      {
        path: 'search',
        pathMatch: 'full',
        redirectTo: 'search/1',
      },
    ]
  }
];
