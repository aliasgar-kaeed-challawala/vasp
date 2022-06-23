import { CognitoService } from 'src/app/cognito.service';
import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DynamodbreadService {
  constructor(
    private cognitoService: CognitoService,
    private Http: HttpClient
  ) {}

  public readItems() {}

  public getItems(): Observable<any[]> {
    return this.Http.get<any[]>(environment.apiUrl + '/tickets');
  }

  async updateItems(
    sno: string,
    status: string,
    comments: string,
    email: string
  ) {
    return this.Http.post(environment.apiUrl + '/tickets/' + sno, {
      status,
      comments,
      email,
    });
  }

  async readSingleItem(sno: string) {
    return this.Http.get<any>(environment.apiUrl + '/tickets/' + sno).subscribe(
      (data) => {}
    );
  }

  public getItemsByAuth() {
    return this.cognitoService.getUser().then((user) => {
      return this.Http.get<any[]>(
        environment.apiUrl + '/tickets/users/' + user.attributes.email
      );
    });
  }
}
