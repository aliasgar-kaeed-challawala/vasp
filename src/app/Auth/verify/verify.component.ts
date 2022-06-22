import { CognitoService } from 'src/app/cognito.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  email: string = '';
  code: string = '';
  emailError: string = '';
  codeError: string = '';
  error: string = '';
  message: string = '';
  loading: boolean = false;

  constructor(private cognitoService: CognitoService) {}

  ngOnInit(): void {}

  public verify() {
    this.loading = true;
    this.emailError = '';
    this.codeError = '';

    if (!this.email || this.email === '') {
      this.emailError = 'Email is required';
      this.loading = false;
      return;
    }

    var emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(presidio.in|presidio.com|gmail.com)$/;

    if (this.email && !this.email.toLowerCase().match(emailRegex)) {
      this.emailError = 'Email should be a valid presidio email or gmail';
      this.loading = false;
      return;
    }

    if (!this.code || this.code === '') {
      this.codeError = 'Code is required';
      this.loading = false;
      return;
    }

    if (this.code.length < 6) {
      this.codeError = 'Code must be at least 6 characters';
      this.loading = false;
      return;
    }

    var codeRegex = /^\d+$/;

    if (this.code && !this.code.match(codeRegex)) {
      this.codeError = 'Code should be a number';
      this.loading = false;
      return;
    }

    this.cognitoService
      .verifyCodeByEmail(this.email, this.code)
      .then(() => {
        this.message = 'Account verified successfully';
        this.loading = false;
      })
      .catch((err) => {
        this.message = err.message;
      });
  }
}
