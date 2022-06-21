import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatbotRoutingModule } from './chatbot-routing.module';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [ChatbotComponent, NavbarComponent, TicketsComponent, ProfileComponent],
  imports: [CommonModule, FormsModule, ChatbotRoutingModule],
})
export class ChatbotModule {}
