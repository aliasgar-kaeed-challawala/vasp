import { GuestGuard } from './Auth/guest.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';

import { ProfileComponent } from './Auth/profile/profile.component';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { UserGuard } from './Auth/user.guard';
import { VaspChatbotComponent } from './vasp-chatbot/vasp-chatbot.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminGuard } from './Auth/admin.guard';

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
    path: '',
    loadChildren: () =>
      import('./chatbot/chatbot.module').then((m) => m.ChatbotModule),
    canActivate: [AuthGuard, UserGuard],
  },
  // {
  //   path: '**',
  //   redirectTo: 'signIn',
  // },
  {
    path: 'chatbot',
    component: VaspChatbotComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard, AdminGuard],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
