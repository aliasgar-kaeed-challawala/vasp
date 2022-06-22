import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CognitoService, IUser } from 'src/app/cognito.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {

  user:any={
    name:'',
    'custom:role':''
  };
  username:any;
  constructor(private route:ActivatedRoute,public cognitoService:CognitoService,public router:Router) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
   this.cognitoService.getUserByUsername(this.username).then((user:any)=>{
    this.user = user;
    this.user.name = user.UserAttributes[2].Value;
    this.user['custom:role'] = user.UserAttributes[3].Value;
   });

  }
  updateUser(name:string,role:string){
   
    this.user.name=name;
    this.user['custom:role']=role;
    this.user.UserAttributes[2].Value=name;
    this.user.UserAttributes[3].Value=role;
    console.log(this.user);
    
    this.cognitoService.updateUserByUsername(this.username,this.user).then(()=>{
      this.back();
    });
    
    
  }
  back(){
    this.router.navigate(['admin/dashboard/users']);
  }
}
