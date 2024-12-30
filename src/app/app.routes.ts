import {Routes} from '@angular/router';
import {LoginComponent} from './features/auth/login/login.component';
import {SignupComponent} from './features/auth/signup/signup.component';
import {AuthLayoutComponent} from './shared/auth-layout/auth-layout.component';
import {BaseLayoutComponent} from './shared/base-layout/base-layout.component';
import {PostsPageComponent} from './features/posts-page/posts-page.component';
import {authGuardFunction} from './core/guards/auth-guard.function';
import {appGuardFunction} from './core/guards/app-guard.function';
import {PostPageComponent} from './features/post-page/post-page.component';

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
      }
    ]
  }
];
