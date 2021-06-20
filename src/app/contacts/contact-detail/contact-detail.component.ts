import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  id: string;
  groupContacts: Contact[] = [];

  constructor(private contactService: ContactService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.contact = this.contactService.getContact(this.id);
        if(this.contact.group && this.contact.group.length) {
          this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
        } else {
          this.groupContacts = [];
        }
      }
    )
  }

  onEditContact() {
    this.router.navigate(['edit'],{relativeTo:this.route})
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['contacts'])
  }

}
