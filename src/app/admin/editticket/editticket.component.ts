import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Backup } from 'aws-sdk';
import { DynamodbreadService } from 'src/app/dynamodbread.service';

@Component({
  selector: 'app-editticket',
  templateUrl: './editticket.component.html',
  styleUrls: ['./editticket.component.scss'],
})
export class EditticketComponent implements OnInit {
  ticket: any;
  ticketid: any = '';
  constructor(
    public dynamodb: DynamodbreadService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.ticketid = this.route.snapshot.paramMap.get('id');
    this.dynamodb.readSingleItem(this.ticketid).subscribe((data) => {
      this.ticket = data;
    });
  }

  updateStatus(status: string, comment: string, email: string) {
    console.log(status, comment, email);
    this.dynamodb
      .updateItems(this.ticketid, status, comment, email)
      .subscribe((data) => {
        console.log(data);
      });
  }

  back() {
    // this.router.navigate(['admin/dashboard/tickets']);
  }
}
