import { CognitoService } from 'src/app/cognito.service';
import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DynamodbreadService {
  private data = new AWS.DynamoDB();

  private docClient = new AWS.DynamoDB.DocumentClient({
    accessKeyId: environment.accessKeyId,
    secretAccessKey: environment.secretAccessKey,
    region: environment.region,
  });

  private params = {
    TableName: 'vasp-data',
  };

  constructor(private cognitoService: CognitoService) {}

  public readItems() {
    return Observable.create(
      (observer: {
        error: (arg0: AWS.AWSError) => void;
        next: (arg0: AWS.DynamoDB.DocumentClient.AttributeMap[]) => void;
      }) => {
        this.docClient.scan(this.params, (err, data) => {
          if (err) {
            observer.error(err);
          } else {
            observer.next(
              data.Items!.map((item) => {
                return item;
              })
            );
          }
        });
      }
    );
  }

  public getItems(): Observable<any[]> {
    return this.readItems();
  }

  async updateItems(sno: string, status: string) {
    const params = {
      TableName: 'vasp-data',
      Key: {
        sno: sno,
      },
      ExpressionAttributeNames: { '#s': 'Status' },
      UpdateExpression: 'set #s = :p',
      ExpressionAttributeValues: {
        ':p': status,
      },
      ReturnValues: 'UPDATED_NEW',
    };

    return this.docClient.update(params);
  }

  async readSingleItem(sno: string) {
    var params = {
      Key: {
        sno: sno,
      },
      TableName: 'vasp-data',
    };
    return await this.docClient.get(params).promise();
  }

  async getItemsByAuth() {
    var params = {
      TableName: 'vasp-data',
    };
    var res = await this.docClient.scan(params).promise();
    return this.cognitoService.getUser().then((user) => {
      return res.Items?.filter((item) => {
        return item['User'] === user.attributes.email;
      });
    });
  }
}
