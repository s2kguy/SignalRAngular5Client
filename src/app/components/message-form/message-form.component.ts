import { ChatService } from './../../services/chat-service.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Message } from './../../models'
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  
  private userMessage: string;

  @Input('message')
  private message : Message;

  //@Input('messages')
  private messages : Message[];

  constructor(private _chatService: ChatService) { 
   
  }
  ngOnInit() {
   this._chatService.cast.subscribe(userMessage => { this.userMessage = userMessage; });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  public sendMessage(): void {
    this.message.timestamp = new Date();
    this.messages.push(this.message);
    
    

   /* this.dialogFlowService.getResponse(this.message.content).subscribe(res => {
      this.messages.push(
        new Message(res.result.fulfillment.speech, 'assets/images/bot.png', res.timestamp)
      );
    });

    this.message = new Message('', 'assets/images/user.png'); */
  }

}
