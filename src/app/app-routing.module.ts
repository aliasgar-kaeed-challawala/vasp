import { GuestGuard } from './Auth/guest.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';

import { ProfileComponent } from './Auth/profile/profile.component';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { UserGuard } from './Auth/user.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signIn',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'signIn',
    component: SignInComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'signUp',
    component: SignUpComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'chatbot',
    loadChildren: () =>
      import('./chatbot/chatbot.module').then((m) => m.ChatbotModule),
    canActivate: [AuthGuard, UserGuard],
  },
  {
    path: '**',
    redirectTo: 'signIn',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
