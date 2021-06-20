import {Injectable} from '@angular/core';
import {Contact} from './contact.model';
import {Subject} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
    contactListChanged = new Subject<Contact[]>();

   
    contacts: Contact [] = [];
    private maxContactId: string = "0";
    constructor(private http: HttpClient) {
        this.getContacts();
    }

    getContacts() {
        this.http.get<Contact[]>('https://angular-contacts-app-e446a-default-rtdb.firebaseio.com/contacts.json')
        .subscribe( (contacts: Contact[]) => {
          this.contacts = contacts;
          console.log(this.contacts)
          this.maxContactId = this.getMaxId();
          this.contacts.sort();
          this.contactListChanged.next(this.contacts.slice());
        }, (error:any) => {
          console.log(error);
        })    
    }

    storeContacts() {
        let contacts = JSON.stringify(this.contacts);
        this.http.put('https://angular-contacts-app-e446a-default-rtdb.firebaseio.com/contacts.json',contacts)
        .subscribe(response => {
            this.contactListChanged.next(this.contacts.slice())
        })
    }

    getContact(id: string): Contact {
        return this.contacts.find(contact=>{return contact.id===id});
    } 

    getMaxId(): string {

        let maxId = 0

        this.contacts.forEach((contact)=>{
            if(parseInt(contact.id) > maxId) {
                maxId = parseInt(contact.id);
            }
        })
        console.log("max id: " + maxId.toString());

        return maxId.toString();
    }

    addContact(newContact: Contact) {
        if(!newContact) {
            return
        }
        
        let newMaxContactId = parseInt(this.maxContactId)
        newMaxContactId = newMaxContactId+1;
        newContact.id = newMaxContactId.toString()

        this.contacts.push(newContact)
        this.storeContacts();
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
        this.storeContacts();
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
        this.storeContacts();
    }
}