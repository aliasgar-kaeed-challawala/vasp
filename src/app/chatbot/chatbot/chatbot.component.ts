import { Component, OnInit } from '@angular/core';
import { LexRuntime } from 'aws-sdk';
import { Message } from './messages';
import { environment } from '../../../environments/environment';
import { ResponseCard } from 'aws-sdk/clients/lexruntime';
import { CognitoService } from '../../cognito.service';
import { DynamoDB } from 'aws-sdk';
import * as uuid from 'uuid';
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  dynamodb = new DynamoDB({ accessKeyId: environment.accessKeyId, secretAccessKey: environment.secretAccessKey, region: environment.region });
  today = Date.now();
  username: string = '';
  initialState: string = `Hi ${this.username}, I am VASP!`;
  constructor(private cognitoService: CognitoService) {

  }

  lex!: LexRuntime;
  userInput: string = "";
  messages: Message[] = [];
  lexResponse?: string;
  responseCard?: ResponseCard;
  button: string[] = [];
  imgUrl: string = "";
  title: string = "";
  cardBoolean: Boolean = false;
  inputText: string = "";
  flag: Boolean = false;
  responses: string[] = [];
  issue: string = "";
  email: string = "";
  device: string = "";
  typeOfIssue: string = "";


  ngOnInit(): void {
    this.lex = new LexRuntime({
      accessKeyId: environment.accessKeyId,
      secretAccessKey: environment.secretAccessKey,
      region: "us-east-1"
    }
    );
    var params = {
      botAlias: 'vaspchatbot',
      botName: 'Vasp',
      inputText: 'Hi',
      userId: 'User',
    };
    this.cognitoService.getUser().then((user: any) => {
      this.username = user.attributes.name;
      this.email = user.attributes.email;
      this.initialState = `Hi ${this.username}, I am VASP!`;
      this.messages.push(new Message(this.initialState, "Bot"));
      this.lex.postText(params, (err, data) => {
        if (err) {
          console.log(err, err.stack);
        }
        else {
          this.responseCard = data.responseCard!;
          this.cardBoolean = true;
          this.responseCard.genericAttachments?.forEach((each) => {
            this.imgUrl = each.imageUrl!;
            this.title = each.title!;
            each.buttons?.forEach((a) => {
              this.button.push(a.text)
            })
          })
          this.messages.push(new Message(data.message!, "Bot"));
        }
      })
    });
  }

  cardResponse(b: any) {
    this.responses.push(b);
    this.inputText = b;
    this.userInput = b;
    this.flag = true;
    this.postLexText();
  }

  postLexText() {
    if (this.userInput == '') { return }
    var params = {
      botAlias: 'vaspchatbot',
      botName: 'Vasp',
      inputText: 'Testing',
      userId: 'User',
    };
    if (!this.flag) {
      this.inputText = this.userInput;
      this.flag = false;
    }
    if (this.inputText == "not working" || this.inputText == "broken") {
      this.inputText = this.device + " " + this.inputText;
    }
    params.inputText = this.inputText;
    this.flag = false;
    this.button = [];
    this.imgUrl = "";
    this.title = "";
    this.lex.postText(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      }
      else {
        this.lexResponse = data.message;
        if (data.slots && data.slots!['Device']) {
          this.typeOfIssue = "Hardware Issue";
          this.device = data?.slots!['Device'];
        }
        if (data.slots && data.slots!['ReimbursementIssues']) {
          this.typeOfIssue = "Reimbursement Issue";
          this.device = data.slots!['ReimbursementIssues'];
        }
        if (this.lexResponse?.includes("Ticket will not be raised")) {
          this.responses = [];
        }
        this.responseCard = data.responseCard!;
        if (this.responseCard) {
          this.cardBoolean = true;
          this.responseCard.genericAttachments?.forEach((each) => {
            this.imgUrl = each.imageUrl!;
            this.title = each.title!;
            each.buttons?.forEach((a) => {
              this.button.push(a.text)
            })
          })
        }
        else {
          this.cardBoolean = false;
        }
      }
      if (data.messageFormat == "Composite") {
        var json = JSON.parse(data.message!);
        this.messages.push(new Message(this.inputText, "User"));
        this.userInput = "";
        Object.keys(json).forEach(key => {
          for (var i = 0; i < json[key].length; i++) {
            this.messages.push(new Message(json[key][i].value, "Bot"));
          }
          if (json[key][0].value == "OK. The Ticket will be raised.") {
            const id = uuid.v4();
            for (var i = 0; i < this.messages.length; i++) {
              if (this.messages[i].content.includes("Do you want to raise a ticket?")) {
                this.issue = this.messages[i - 1].content;
                if (this.issue == "broken" || this.issue == "not working") {
                  this.issue += this.device + " ";
                  console.log(this.issue);
                }
              }
            }
            var record = {
              TableName: 'vasp-data',
              Item: {
                'sno': { S: id },
                'Type of Issue': { S: this.typeOfIssue },
                'Device': { S: this.device },
                'Issue': { S: this.issue },
                'User': { S: this.email },
                'Status': { S: "pending" },
                'Date': { S: new Date().toISOString() }
              }
            }
            this.dynamodb.putItem(record, function (err, data) {
              if (err) {
                console.log("Error", err)
              }
              else {
                console.log("Success", data)
              }
            }).promise();
          }
        });
        this.responses = [];
      }
      else {
        this.messages.push(new Message(this.inputText, "User"));
        this.userInput = "";
        this.messages.push(new Message(this.lexResponse!, "Bot"));
      }
    });
  }
  isUser(sender: string) {
    if (sender == "Bot") {
      return true;
    }
    else {
      return false;
    }
  }

}



