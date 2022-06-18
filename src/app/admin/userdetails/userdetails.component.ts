import { Component, OnInit } from '@angular/core';
import { CognitoService, IUser } from 'src/app/cognito.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss']
})
export class UserdetailsComponent implements OnInit {

  users:any;

  constructor(public cognitoService:CognitoService) {
      
   }
   getAllUsers(){
    this.cognitoService.getAllUsers().then((users:any)=>{
      this.users=users.Users;
      console.log(this.users);
      
      console.log(users.Users);
      console.log(users.Users[0].Attributes);
      console.log(users.Users[0].Attributes[2].Value);
      
    })
    
   }
  ngOnInit(): void {
    this.getAllUsers();
  }

}
