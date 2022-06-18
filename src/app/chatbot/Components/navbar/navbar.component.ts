import { CognitoService } from './../../../cognito.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private cognitoService: CognitoService, private router: Router) {}

  ngOnInit(): void {}

  public logout() {
    this.cognitoService.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
