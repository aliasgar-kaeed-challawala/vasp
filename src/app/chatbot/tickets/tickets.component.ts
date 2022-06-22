import { DynamodbreadService } from './../../dynamodbread.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  constructor(private dynomoService: DynamodbreadService) { }

  status: string = '';
  date: string = '';
  loading: boolean = true;
  tickets: any = [];

  ngOnInit(): void {
    this.dynomoService.getItemsByAuth().then((data) => {
      this.tickets = data;
      this.loading = false;
    });
  }

  onSearch() {
    if (this.status === '' && this.date === '') {
      return;
    }
    this.tickets = [];
    this.loading = true;

    this.dynomoService.getItemsByAuth().then((data) => {
      this.tickets = data?.filter((ticket) => {
        return (
          ticket['Status'].toLowerCase().includes(this.status.toLowerCase()) &&
          ticket['Date'].includes(this.date)
        );
      });
      this.loading = false;
    });
  }

  onClear() {
    this.status = '';
    this.date = '';
    this.tickets = [];
    this.loading = true;

    this.dynomoService.getItemsByAuth().then((data) => {
      this.tickets = data;
      this.loading = false;
    });
  }
}
