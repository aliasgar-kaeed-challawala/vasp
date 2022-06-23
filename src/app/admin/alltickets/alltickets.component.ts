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

  tickets: any = [] || {};

  ngOnInit(): void {
    this.dynomoService.getItems().subscribe((data) => {
      this.tickets = data;
      this.tickets = this.tickets.Items;
    });
  }

  onSearch() {
    if (this.status === '' && this.date === '') {
      return;
    }

    this.dynomoService.getItems().subscribe((data) => {
      this.tickets = data;

      this.tickets = this.tickets.Items.filter((ticket: any) => {
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
      this.tickets = this.tickets.Items;
    });
  }
}
