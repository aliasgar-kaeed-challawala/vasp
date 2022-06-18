import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatbotRoutingModule } from './chatbot-routing.module';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { NavbarComponent } from './Components/navbar/navbar.component';


@NgModule({
  declarations: [
    ChatbotComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ChatbotRoutingModule
  ]
})
export class ChatbotModule { }
