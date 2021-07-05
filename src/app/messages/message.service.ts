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
        this.http.get<Message[]>('http://localhost:3000/messages')
        .subscribe( (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages.sort();
          this.messagesChanged.next(this.messages.slice());
        }, (error:any) => {
          console.log(error);
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

    addMessage(msg: Message) {
        if (!msg) {
            return;
          }
      
          // make sure id of the new Document is empty
          msg.id = '';
      
          const headers = new HttpHeaders({'Content-Type': 'application/json'});
      
          // add to database
          this.http.post<{ message: string, msg: Message }>('http://localhost:3000/messages',
            msg,
            { headers: headers })
            .subscribe(
              (responseData) => {
                // add new msg to msgs
                this.messages.push(responseData.msg);
                this.messagesChanged.next(this.messages.slice())
                }
            );
    }

}