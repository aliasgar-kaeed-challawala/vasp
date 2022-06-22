import { ChatbotComponent } from './chatbot/chatbot.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'chatbot',
    component: ChatbotComponent,
  },
  {
    path: 'tickets',
    component: TicketsComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatbotRoutingModule {}
