import {EventEmitter, Injectable} from '@angular/core';
import {Message} from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class MessageService {   
    messagesChanged = new EventEmitter<Message[]>();
    messages: Message[]=[];
    private maxMessageId: string = "0";

    constructor(private http: HttpClient) {
        this.getMessages()
    }

    getMessages() {
        this.http.get<Message[]>('https://angular-contacts-app-e446a-default-rtdb.firebaseio.com/messages.json')
        .subscribe( (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages.sort();
          this.messagesChanged.next(this.messages.slice());
        }, (error:any) => {
          console.log(error);
        })
    }

    storeMessages() {
        let messages = JSON.stringify(this.messages);
        this.http.put('https://angular-contacts-app-e446a-default-rtdb.firebaseio.com/messages.json',messages)
        .subscribe(response => {
            this.messagesChanged.next(this.messages.slice())
        })
    }

    getMessage(id: string): Message {
        this.messages.forEach((message)=>{
            if(message.id == id) {
                return message;
            }
        })
        return null;
    } 

    getMaxId(): string {
        let maxId = 0
        this.messages.forEach((message)=>{
            if(parseInt(message.id) > maxId) {
                maxId = parseInt(message.id);
            }
        })
        return maxId.toString();
    }

    addMessage(message: Message) {
        this.messages.push(message);
        this.storeMessages()
    }

}