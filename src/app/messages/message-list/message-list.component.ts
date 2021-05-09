import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})

export class MessageListComponent implements OnInit {

  messages: Message[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage(message: Message) {
    this.messages.push(message)
  }

}
