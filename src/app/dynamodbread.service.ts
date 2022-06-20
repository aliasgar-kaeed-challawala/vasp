import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DynamodbreadService {
  private data = new AWS.DynamoDB();
  private docClient = new AWS.DynamoDB.DocumentClient({ accessKeyId: environment.accessKeyId, secretAccessKey: environment.secretAccessKey, region: environment.region });
  private params = {
    TableName: 'vasp-data'
  };
  constructor() {
  }
  public readItems() {
    return Observable.create((observer: { error: (arg0: AWS.AWSError) => void; next: (arg0: AWS.DynamoDB.DocumentClient.AttributeMap[]) => void; }) => {
      this.docClient.scan(this.params, (err, data) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(data.Items!.map(item => {
            console.log(item);
            return item;
          }));
        }
      });
    });
  }
  public getItems(): Observable<any[]> {
    return this.readItems();
  }
  updateItems(sno: string, status: string){
    const params = {
      TableName: "vasp-data",
      Key: {
        sno: sno,
      },
      ExpressionAttributeNames: { "#s": "Status" },
      UpdateExpression: "set #s = :p",
      ExpressionAttributeValues: {
        ":p": status,
      },
      ReturnValues:"UPDATED_NEW"
    };

    this.docClient.update(params, (res => {
      console.log(res);
    }));
  }
  async readSingleItem(sno: string){
          var params = {
              Key: {
               "sno": sno
              }, 
              TableName: "vasp-data"
          };
          return await this.docClient.get(params).promise()
    }
}
