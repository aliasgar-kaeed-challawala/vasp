import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { EdituserComponent } from './edituser/edituser.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AllticketsComponent } from './alltickets/alltickets.component';
import { EditticketComponent } from './editticket/editticket.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidenavComponent,
    UserdetailsComponent,
    EdituserComponent,
    AllticketsComponent,
    EditticketComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
