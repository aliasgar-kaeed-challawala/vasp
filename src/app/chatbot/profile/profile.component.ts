import { CognitoService, IUser } from 'src/app/cognito.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  loading: boolean;
  user: IUser;
  message: any = '';

  constructor(private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as IUser;
  }

  ngOnInit(): void {
    this.cognitoService.getUser().then((user: any) => {
      this.user = user.attributes;
    });
  }

  public update(): void {
    this.message = '';
    this.loading = true;

    if (!this.user.name || this.user.name == '') {
      this.message = 'Please enter your name';
      this.loading = false;
      return;
    }

    this.cognitoService
      .updateUser(this.user)
      .then(() => {
        this.message = 'Updated successfully';
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }
}
