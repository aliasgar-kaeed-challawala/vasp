import { Component, OnInit } from '@angular/core';
import { DynamodbreadService } from 'src/app/dynamodbread.service';

@Component({
  selector: 'app-alltickets',
  templateUrl: './alltickets.component.html',
  styleUrls: ['./alltickets.component.scss'],
})
export class AllticketsComponent implements OnInit {
  constructor(private dynomoService: DynamodbreadService) {}

  status: string = '';
  date: string = '';

  tickets: any = [];

  ngOnInit(): void {
    this.dynomoService.getItems().subscribe((data) => {
      this.tickets = data;
      console.log(this.tickets);
    });
  }

  onSearch() {
    if (this.status === '' && this.date === '') {
      return;
    }

    this.dynomoService.getItems().subscribe((data) => {
      this.tickets = data?.filter((ticket) => {
        return (
          ticket['Status'].toLowerCase().includes(this.status.toLowerCase()) &&
          ticket['Date'].includes(this.date)
        );
      });
    });
  }

  onClear() {
    this.status = '';
    this.date = '';

    this.dynomoService.getItems().subscribe((data) => {
      this.tickets = data;
    });
  }
}
