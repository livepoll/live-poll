import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'my-polls', loadChildren: () => import('./pages/my-polls/my-polls.module').then(m => m.MyPollsModule) },
  { path: 'analytics', loadChildren: () => import('./pages/analytics/analytics.module').then(m => m.AnalyticsModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
