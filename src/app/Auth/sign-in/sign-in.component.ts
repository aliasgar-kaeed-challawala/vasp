import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IUser, CognitoService } from '../../cognito.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  loading: boolean;
  emailError: string = '';
  passwordError: string = '';
  error: string = '';
  user: IUser;
  message: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cognitoService: CognitoService
  ) {
    this.loading = false;
    this.user = {} as IUser;
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['state'] === 'created') {
        this.message = 'Your account has been created.';
      } else if (params['state'] === 'not-authenticated') {
        this.message = 'Please sign in.';
      } else if (
        params['state'] === 'not-a-user' ||
        params['state'] === 'not-an-admin'
      ) {
        this.message = "You don't have access to this page.";
      }
    });
  }

  public signIn(): void {
    this.loading = true;
    this.emailError = '';
    this.passwordError = '';

    if (!this.user.email || this.user.email === '') {
      this.emailError = 'Email is required';
      this.loading = false;
      return;
    }

    var emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(presidio.in|presidio.com|gmail.com)$/;

    if (this.user.email && !this.user.email.toLowerCase().match(emailRegex)) {
      this.emailError = 'Email should be a valid presidio email or gmail';
      this.loading = false;
      return;
    }

    if (!this.user.password || this.user.password === '') {
      this.passwordError = 'Password is required';
      this.loading = false;
      return;
    }

    this.cognitoService
      .signIn(this.user)
      .then(() => {
        this.cognitoService.getUser().then((user) => {
          if (user.attributes['custom:role'] === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/chatbot']);
          }
        });
      })
      .catch((e) => {
        this.error = e.message;
        this.loading = false;
      });
  }
}
