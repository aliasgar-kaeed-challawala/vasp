import { Component, OnInit } from '@angular/core';
import { LexRuntime } from 'aws-sdk';
import { Message } from './messages';
import { environment } from '../../environments/environment';
import { ResponseCard } from 'aws-sdk/clients/lexruntime';
import { CognitoService } from '../cognito.service';
import {DynamoDB} from 'aws-sdk';
import * as uuid from 'uuid';

@Component({
  selector: 'app-vasp-chatbot',
  templateUrl: './vasp-chatbot.component.html',
  styleUrls: ['./vasp-chatbot.component.scss']
})


export class VaspChatbotComponent implements OnInit {

  dynamodb = new DynamoDB({ accessKeyId: environment.accessKeyId, secretAccessKey: environment.secretAccessKey, region: environment.region});
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
  ticketFlag: Boolean = false;
  responses: string[] = [];
  issue: string = "";
  email:string = "";

  ngOnInit(): void {

    this.cognitoService.getUser().then((user: any) => {
      this.username = user.attributes.name;
      this.email = user.attributes.email;
      this.initialState = `Hi ${this.username}, I am VASP!. How're you doing?`;
      this.messages.push(new Message(this.initialState, "Bot"));
    });
  }

  cardResponse(b: any) {
    console.log(b);
    this.responses.push(b);
    this.inputText = b;
    this.flag = true;
    this.postLexText();
  }

  postLexText() {
    var params = {
      botAlias: 'vaspchatbot',
      botName: 'Vasp',
      inputText: 'Testing',
      userId: 'User',
    };

    this.lex = new LexRuntime({
      accessKeyId: environment.accessKeyId,
      secretAccessKey: environment.secretAccessKey,
      region: "us-east-1"
    }
    );

    console.log(this.flag);
    if (!this.flag) {
      this.inputText = this.userInput;
      this.flag = false;
    }

    params.inputText = this.inputText;
    this.flag = false;
    console.log(params.inputText)
    this.button = [];
    this.imgUrl = "";
    this.title = "";
    this.lex.postText(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      }
      else {
        this.lexResponse = data.message;
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
        var json = JSON.parse(data.message!)
        this.messages.push(new Message(this.inputText, "User"));
        this.userInput = "";
        Object.keys(json).forEach(key => {
          for (var i = 0; i < json[key].length; i++) {
            this.messages.push(new Message(json[key][i].value, "Bot"));
          }
          if (json[key][0].value == "OK. The Ticket will be raised.") {
            const id = uuid.v4();
            var checkmsg = "Ok. How can I help with your " + this.responses[1] + "?";
            console.log(checkmsg);
            for (var i = 0; i < this.messages.length; i++) {
              if (this.messages[i].content == checkmsg) {
                console.log("message");
                this.issue = this.messages[i + 1].content;
                console.log(this.issue);
              }
            }
            var record = {
              TableName: 'vasp-data',
              Item: {
                'sno': { S: id },
                'Type of Issue': { S: this.responses[0] },
                'Device': { S: this.responses[1] },
                'Issue': { S: this.issue },
                'User': {S: this.email},
                'Status': {S: "pending"},
                'Date': {S: new Date().toISOString()}
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

