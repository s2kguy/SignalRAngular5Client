import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Rx';
import { HubConnection } from '@aspnet/signalr-client';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ChatService {

  _hubConnection: HubConnection;


  private message = new BehaviorSubject<string>('');
  cast = this.message.asObservable();

  // Declare and Start the HubConnection privately 
  private init(){
    this._hubConnection = new HubConnection('http://localhost:56624/chat');
    this._hubConnection.start()
      .then(() => {
        console.log('Chat Hub Connection Started!');
        this._hubConnection.invoke('sendMessage', 'New User has Joined!');
      })
      .catch(() => {
        console.log("Error while establishing connection....FUCK!");
      });

  }

  constructor() { this.init(); }

  nextMessage(nextMessage){
    this.message.next(nextMessage);
  }

  sendMessage(message: string){
    this._hubConnection.invoke('sendMessage', message);
    return message;
  }

  leave(): void {
    this._hubConnection.invoke('Leave');
  }

  join(): void {
    this._hubConnection.invoke('Join');
  }

  

}
