import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditticketComponent } from './editticket/editticket.component';
import { EdituserComponent } from './edituser/edituser.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'dashboard/users',
    component:DashboardComponent
  },
  {
    path:'edit',
    component:EdituserComponent
  },
  {
    path:'dashboard/users/edit/:username',
    component:EdituserComponent
  },
  {
    path:'editticket',
    component:EditticketComponent
  },
  {
    path:'dashboard/tickets/edit/:id',
    component:EditticketComponent
  },
  {
    path:'dashboard/tickets',
    component:DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
