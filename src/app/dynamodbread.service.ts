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

  public updateItems(
    sno: string,
    status: string,
    comments: string,
    email: string
  ) {
    return this.Http.post(
      environment.apiUrl + '/tickets/' + sno,
      {
        status,
        comments,
        email,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  public readSingleItem(sno: string): Observable<any[]> {
    return this.Http.get<any>(environment.apiUrl + '/tickets/' + sno);
  }

  public async getItemsByAuth() {
    const user = await this.cognitoService.getUser();
    return this.Http.get<any[]>(
      environment.apiUrl + '/tickets/users/' + user.attributes.email
    ).toPromise();
  }
}
