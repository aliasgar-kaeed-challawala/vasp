import { Component, OnInit } from '@angular/core';
import {LexRuntime}  from 'aws-sdk';
import { Message } from './messages';
import { environment } from '../../environments/environment';
import { DynamodbreadService } from '../dynamodbread.service';

@Component({
  selector: 'app-vasp-chatbot',
  templateUrl: './vasp-chatbot.component.html',
  styleUrls: ['./vasp-chatbot.component.scss']
})


export class VaspChatbotComponent implements OnInit {

  
  constructor(private dynamodbreadservice: DynamodbreadService) { }
  lex!: LexRuntime;
  userInput: string = "";
  messages: Message[] = [];
  lexResponse?: string;
  
  ngOnInit() {
    this.readItems();
    this.updateItems();
    this.readSingleItem();
  }
  readItems(){
    this.dynamodbreadservice.getItems().subscribe(res => {
      console.log(res);
    });
  }
  updateItems(){
    this.dynamodbreadservice.updateItems("87be49d1-fd15-4e50-9cff-e769575f3cf2", "Pending");
  }
  readSingleItem(){
    this.dynamodbreadservice.readSingleItem("87be49d1-fd15-4e50-9cff-e769575f3cf2").then(res => {
      console.log(res);
    })
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
    params.inputText= this.userInput;
    this.lex.postText(params, (err , data)=>{
      if (err){
        console.log(err, err.stack); 
      }
      else {
        console.log(data);
        this.lexResponse = data.message;
      }
      this.messages.push(new Message(this.userInput,"User"));
        this.userInput="";
      this.messages.push(new Message(this.lexResponse!,"Bot"));
    });
  }

}
