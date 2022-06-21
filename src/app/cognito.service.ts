import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Amplify, { Auth } from 'aws-amplify';
var AWS = require('aws-sdk');

import { environment } from '../environments/environment';

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
  'custom:role': string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  private authenticationSubject: BehaviorSubject<any>;

  constructor() {
    Amplify.configure({
      Auth: environment.cognito,
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        name: user.name,
        'custom:role': 'user',
      },
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password).then(() => {
      this.authenticationSubject.next(true);
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut().then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
        .then((user: any) => {
          if (user) {
            return true;
          } else {
            return false;
          }
        })
        .catch(() => {
          return false;
        });
    }
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser().then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }

  public getAllUsers(): Promise<any> {
    var params = {
      UserPoolId: environment.cognito.userPoolId,
    };

    return new Promise((resolve, reject) => {
      AWS.config.update({
        region: environment.region,
        accessKeyId: environment.accessKeyId,
        secretAccessKey: environment.secretAccessKey,
      });

      var cognitoidentityserviceprovider =
        new AWS.CognitoIdentityServiceProvider();

      cognitoidentityserviceprovider.listUsers(
        params,
        (err: any, data: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  public getUserByUsername(username: string): Promise<any> {
    var params = {
      UserPoolId: environment.cognito.userPoolId,
      Username: username,
    };

    return new Promise((resolve, reject) => {
      AWS.config.update({
        region: environment.region,
        accessKeyId: environment.accessKeyId,
        secretAccessKey: environment.secretAccessKey,
      });

      var cognitoidentityserviceprovider =
        new AWS.CognitoIdentityServiceProvider();

      cognitoidentityserviceprovider.adminGetUser(
        params,
        (err: any, data: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  public updateUserByUsername(username: string, user: IUser): Promise<any> {
    console.log(user);
    
    var params = {
      UserPoolId: environment.cognito.userPoolId,
      Username: username,
      UserAttributes: [
        {
          Name: 'name',
          Value: user.name,
        },
        {
          Name: 'custom:role',
          Value: user['custom:role'],
        },
      ],
    };

    return new Promise((resolve, reject) => {
      AWS.config.update({
        region: environment.region,
        accessKeyId: environment.accessKeyId,
        secretAccessKey: environment.secretAccessKey,
      });

      var cognitoidentityserviceprovider =
        new AWS.CognitoIdentityServiceProvider();

      cognitoidentityserviceprovider.adminUpdateUserAttributes(
        params,
        (err: any, data: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  public deleteUserByUsername(username: string): Promise<any> {
    var params = {
      UserPoolId: environment.cognito.userPoolId,
      Username: username,
    };

    return new Promise((resolve, reject) => {
      AWS.config.update({
        region: environment.region,
        accessKeyId: environment.accessKeyId,
        secretAccessKey: environment.secretAccessKey,
      });

      var cognitoidentityserviceprovider =
        new AWS.CognitoIdentityServiceProvider();

      cognitoidentityserviceprovider.adminDeleteUser(
        params,
        (err: any, data: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }
}
