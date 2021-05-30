import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model'
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];

  constructor(private contactService: ContactService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }

  onNewContact() {
    this.router.navigate(['new'], {relativeTo:this.route});
  }

}
