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
        this.http.get<Contact[]>('http://localhost:3000/contacts/')
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

    // storeContacts() {
    //     let contacts = JSON.stringify(this.contacts);
    //     this.http.put('http://localhost:3000/contacts/',contacts)
    //     .subscribe(response => {
            
    //     })
    // }

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

    addContact(contact: Contact) {
        if (!contact) {
            return;
        }
      
        // make sure id of the new Document is empty
        contact.id = '';
      
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
      

        console.dir(contact);
        // add to database
        this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
            contact,
            { headers: headers })
            .subscribe(
              (responseData) => {
                // add new contact to contacts
                this.contacts.push(responseData.contact);
                this.contactListChanged.next(this.contacts.slice())
              }
            );
    }

    updateContact(originalContact: Contact, newContact: Contact) {
        if (!originalContact || !newContact) {
            return;
          }
      
          const pos = this.contacts.findIndex(d => d.id === originalContact.id);
      
          if (pos < 0) {
            return;
          }
      
          // set the id of the new Document to the id of the old Document
          newContact.id = originalContact.id;
      
          const headers = new HttpHeaders({'Content-Type': 'application/json'});
      
          // update database
          this.http.put('http://localhost:3000/contacts/' + originalContact.id,
            newContact, { headers: headers })
            .subscribe(
              (response: Response) => {
                this.contacts[pos] = newContact;
                this.contactListChanged.next(this.contacts.slice())
              }
            );
        
    }

    deleteContact(contact: Contact) {
        if (!contact) {
            return;
          }
      
          const pos = this.contacts.findIndex(d => d.id === contact.id);
      
          if (pos < 0) {
            return;
          }
      
          // delete from database
          this.http.delete('http://localhost:3000/contacts/' + contact.id)
            .subscribe(
              (response: Response) => {
                this.contacts.splice(pos, 1);
                this.contactListChanged.next(this.contacts.slice())
              }
            );
    }
}