import { VerifyComponent } from './Auth/verify/verify.component';
import { GuestGuard } from './Auth/guest.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';

import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { UserGuard } from './Auth/user.guard';
import { AdminGuard } from './Auth/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signIn',
    pathMatch: 'full',
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
    path: 'verify',
    component: VerifyComponent,
    canActivate: [GuestGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./chatbot/chatbot.module').then((m) => m.ChatbotModule),
    canActivate: [AuthGuard, UserGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard, AdminGuard],
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
