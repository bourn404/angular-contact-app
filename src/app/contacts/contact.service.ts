import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
    contactSelected = new EventEmitter<Contact>();
   
    private contacts: Contact [] =[];
    constructor() {
        this.contacts = MOCKCONTACTS;
    }

    getContacts() {
        return this.contacts.slice();
    }

    getContact(id: number): Contact {
        return this.contacts.find(contact=>{return contact.id===id});
    } 
}