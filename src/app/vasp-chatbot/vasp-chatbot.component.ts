import { Component, OnInit } from '@angular/core';
import {LexRuntime}  from 'aws-sdk';
import { Message } from './messages';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-vasp-chatbot',
  templateUrl: './vasp-chatbot.component.html',
  styleUrls: ['./vasp-chatbot.component.scss']
})


export class VaspChatbotComponent implements OnInit {

  
  constructor() { }
  lex!: LexRuntime;
  userInput: string = "";
  messages: Message[] = [];
  lexResponse?: string;
  initialState: string="Hi, I am VASP!. How're you doing?";

  ngOnInit() {
    this.messages.push(new Message(this.initialState,"Bot"));
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

  /*
  sendMessage(){
    this.messages.push(new Message("user",this.userInput));
    this.userInput="";
  }*/

  isUser(sender:string){
    if(sender=="Bot"){
      return true;
    }
    else{
      return false;
    }
  }

}
