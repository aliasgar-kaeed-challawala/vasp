import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, CognitoService } from '../../cognito.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  loading: boolean;
  isConfirm: boolean;
  nameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  codeError: string = '';
  error: string = '';
  user: IUser;

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;
  }

  public signUp(): void {
    this.loading = true;
    this.nameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.error = '';

    if (!this.user.name || this.user.name === '') {
      this.nameError = 'Name is required';
      this.loading = false;
      return;
    }

    if (this.user.name && this.user.name.length < 3) {
      this.nameError = 'Name must be at least 3 characters';
      this.loading = false;
      return;
    }

    if (this.user.name.length > 30) {
      this.nameError = 'Name must be less than 30 characters';
      this.loading = false;
      return;
    }

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

    var passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

    if (this.user.password && !this.user.password.match(passwordRegex)) {
      this.passwordError =
        'Password must be at least 8 characters and contain at least one number and one special character';
      this.loading = false;
      return;
    }

    this.cognitoService
      .signUp(this.user)
      .then(() => {
        this.loading = false;
        this.isConfirm = true;
      })
      .catch((e) => {
        this.error = e.message;
        this.loading = false;
      });
  }

  public confirmSignUp(): void {
    this.loading = true;
    this.codeError = '';
    this.error = '';

    if (!this.user.code || this.user.code === '') {
      this.codeError = 'Code is required';
      this.loading = false;
      return;
    }

    if (this.user.code.length < 6) {
      this.codeError = 'Code must be at least 6 characters';
      this.loading = false;
      return;
    }

    var codeRegex = /^\d+$/;

    if (this.user.code && !this.user.code.match(codeRegex)) {
      this.codeError = 'Code should be a number';
      this.loading = false;
      return;
    }

    this.cognitoService
      .confirmSignUp(this.user)
      .then(() => {
        this.router.navigate(['/signIn'], {
          queryParams: { state: 'created' },
        });
      })
      .catch((e) => {
        this.error = e.message;
        this.loading = false;
      });
  }
}
