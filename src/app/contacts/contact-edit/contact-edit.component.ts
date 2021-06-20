import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  id: string;
  editMode = false;
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];

  constructor(private route: ActivatedRoute, private contactService: ContactService, private router:Router) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if(this.id == null) { return }
        this.originalContact = this.contactService.getContact(this.id);
        if(this.originalContact == null) { return }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
        // if(this.contact.group.length) {
        //   this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
        // }
      }
    );
  }

  onSubmit(form:NgForm) {
    const value = form.value;
    const newContact = new Contact(this.contactService.getMaxId()+1,value.name, value.email, value.phone, value.imageUrl, []);
    if(this.editMode) {
      this.contactService.updateContact(this.originalContact,newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts'])
  }

  onCancel() {
    this.router.navigate(['/contacts'])
  }

  isInvalidContact(newContact:Contact) {
    if(!newContact) {return true}
    if(this.contact && newContact.id === this.contact.id) {return true}
    for(let i=0;i<this.groupContacts.length;i++) {
      if(newContact.id===this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event:any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if(invalidGroupContact) {return;}
    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(index: number) {
    if(index<0||index>this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index,1);
  }
 
}
