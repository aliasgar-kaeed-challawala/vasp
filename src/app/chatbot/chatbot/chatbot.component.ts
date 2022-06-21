import { Component, OnInit } from '@angular/core';
import {LexRuntime}  from 'aws-sdk';
import { Message } from './messages';
import { environment } from '../../../environments/environment';
import { ResponseCard } from 'aws-sdk/clients/lexruntime';
import { CognitoService } from '../../cognito.service';
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  username:string='';
  initialState: string= `Hi ${this.username}, I am VASP!`  ;
  constructor(private cognitoService: CognitoService) {
   
  }

  lex!: LexRuntime;
  userInput: string = "";
  messages: Message[] = [];
  lexResponse?: string;
  responseCard?: ResponseCard;
  button: string[]=[];
  imgUrl: string="";
  title: string="";
  cardBoolean: Boolean = false;
  inputText:string="";
  flag: Boolean=false;

  ngOnInit(): void {
    
    this.cognitoService.getUser().then((user: any) => {
      this.username = user.attributes.name;
      this.initialState = `Hi ${this.username}, I am VASP!. How're you doing?`;
      this.messages.push(new Message(this.initialState,"Bot"));
    });
  }

  cardResponse(b:any){
    console.log(b);
    //console.log((<HTMLInputElement>document.getElementById("Hardware issues")).value);
    this.inputText=b;
    this.flag=true;
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
    if(!this.flag){
      this.inputText=this.userInput;
      this.flag=false;
    }
    params.inputText= this.inputText;
    this.flag=false;
    console.log(params.inputText)
    this.button=[];
    this.imgUrl="";
    this.title="";
    this.lex.postText(params, (err , data)=>{
      if (err){
        console.log(err, err.stack); 
      }
      else {
        this.lexResponse = data.message;
        this.responseCard=data.responseCard!;
        if(this.responseCard){
          this.cardBoolean=true;
          this.responseCard.genericAttachments?.forEach((each) => {
            this.imgUrl=each.imageUrl!;
            this.title=each.title!;
            each.buttons?.forEach((a)=>{
              this.button.push(a.text)
            })
          })
        }
        else{
          this.cardBoolean=false;
        }
      }
    this.messages.push(new Message(this.inputText,"User"));
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
