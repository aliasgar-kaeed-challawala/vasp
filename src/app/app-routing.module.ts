import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './Auth/profile/profile.component';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { VaspChatbotComponent } from './vasp-chatbot/vasp-chatbot.component';

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
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
  // {
  //   path: '**',
  //   redirectTo: 'signIn',
  // },
  {
    path: 'chatbot',
    component: VaspChatbotComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}