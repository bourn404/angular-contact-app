import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  @Output() contactSelected = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onSelected(){
    this.contactSelected.emit();
  }

}
