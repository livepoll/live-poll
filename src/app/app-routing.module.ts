/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';

const routes: Routes = [
  /*{ path: '', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule) },*/
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
  {path: 'signup', loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule)},
  {path: 'p/:slug', loadChildren: () => import('./pages/poll-participants/poll-participants.module').then(m => m.PollParticipantsModule)},
  {path: 'r/:pollId', loadChildren: () => import('./pages/presentation/presentation.module').then(m => m.PresentationModule)},
  {path: 'activate/:token', loadChildren: () => import('./pages/activation/activation.module').then(m => m.ActivationModule)},
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: '/dashboard/home'},
      {path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
      {path: 'my-polls', loadChildren: () => import('./pages/my-polls/my-polls.module').then(m => m.MyPollsModule)},
      {path: 'my-polls/poll/:id', loadChildren: () => import('./pages/poll/poll.module').then(m => m.PollModule)},
      {path: 'analytics', loadChildren: () => import('./pages/analytics/analytics.module').then(m => m.AnalyticsModule)}
    ]
  },
  {path: '**', pathMatch: 'full', redirectTo: '/error'},
  {path: 'error', loadChildren: () => import('./pages/error/error.module').then(m => m.ErrorModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
