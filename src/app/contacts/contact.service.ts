import {Injectable} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
    contactListChanged = new Subject<Contact[]>();

   
    private contacts: Contact [] =[];
    private maxContactId: number = 0;
    constructor() {
        this.contacts = MOCKCONTACTS;
        this.maxContactId = this.getMaxId();
    }

    getContacts() {
        return this.contacts.slice();
    }

    getContact(id: number): Contact {
        return this.contacts.find(contact=>{return contact.id===id});
    } 

    getMaxId(): number {

        let maxId = 0

        this.contacts.forEach((contact)=>{
            if(contact.id > maxId) {
                maxId = contact.id;
            }
        })

        return maxId;
    }

    addContact(newContact: Contact) {
        if(!newContact) {
            return
        }
    
        this.maxContactId++
        newContact.id = this.maxContactId

        this.contacts.push(newContact)
        this.contactListChanged.next(this.contacts.slice())
    }

    updateContact(originalContact: Contact, newContact: Contact) {
        if(!originalContact || !newContact) {
            return
        }
    
        let pos = this.contacts.indexOf(originalContact)
        if(pos < 0){
            return
        }
    
        newContact.id = originalContact.id
        this.contacts[pos] = newContact
        this.contactListChanged.next(this.contacts.slice())
    }

    deleteContact(contact: Contact) {
        if (!contact) {
           return;
        }
        const pos = this.contacts.indexOf(contact);
        if (pos < 0) {
           return;
        }
        this.contacts.splice(pos, 1);
        this.contactListChanged.next(this.contacts.slice());
    }
}