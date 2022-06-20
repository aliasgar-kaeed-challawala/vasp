import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  constructor() {}

  email: string = '';
  status: string = '';
  date: string = '';

  ngOnInit(): void {}
}
