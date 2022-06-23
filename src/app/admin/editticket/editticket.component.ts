import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Backup } from 'aws-sdk';
import { DynamodbreadService } from 'src/app/dynamodbread.service';

@Component({
  selector: 'app-editticket',
  templateUrl: './editticket.component.html',
  styleUrls: ['./editticket.component.scss']
})
export class EditticketComponent implements OnInit {
  ticket: any;
  ticketid:any='';
  constructor(public dynamodb:DynamodbreadService,private route:ActivatedRoute,public router:Router) { }

  ngOnInit(): void {
    this.ticketid = this.route.snapshot.paramMap.get('id');
   this.dynamodb.readSingleItem(this.ticketid).then((data:any)=>{

    this.ticket = data; 
    this.ticketid = data.Item['sno']; 

    })
    
  }
  updateStatus(status:string,comment:string){
    console.log(comment);
    
    this.dynamodb.updateItems(this.ticketid,status).then(()=>{
      this.back();
    })
    

  }
  back(){
    this.router.navigate(['admin/dashboard/tickets']);
  }
}
