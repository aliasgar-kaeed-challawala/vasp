import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { bufferToggle } from 'rxjs';
import { CognitoService } from 'src/app/cognito.service';
import { DynamodbreadService } from 'src/app/dynamodbread.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isshow=true;
  users:any;
  usercount:any;
  ticketCount:any;
  toggledisplay(){
    this.isshow=!this.isshow;
    

  }

  constructor(public router: Router, public cognitoService:CognitoService,public dynamodb:DynamodbreadService) { 

    console.log("from sidenav")
  this.cognitoService.getAllUsers().then((users:any)=>{
    this.users=users.Users;
    this.usercount=this.users.length;



  });
  this.dynamodb.getItems().subscribe((data:any)=>{
    this.ticketCount = data.length;
  }) 
  }

  ngOnInit(): void {}
  public logout(){
    this.cognitoService.signOut().then(()=>{
      this.router.navigate(['/']);
    });
  }
}
  


