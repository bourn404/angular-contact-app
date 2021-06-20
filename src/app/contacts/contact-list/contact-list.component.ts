import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contact.model'
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  private clChangeSub: Subscription;

  constructor(private contactService: ContactService, 
    private router: Router,
    private route: ActivatedRoute) { }
    term: string

  ngOnInit(): void {
    this.contacts = this.contactService.contacts;
    this.clChangeSub = this.contactService.contactListChanged.subscribe(
      (contacts:Contact[]) => {
        this.contacts = contacts;
      }
    )
  }

  ngOnDestroy(): void {
    this.clChangeSub.unsubscribe();
  }

  onNewContact() {
    this.router.navigate(['new'], {relativeTo:this.route});
  }

  search(value: string) {

    this.term = value;
    
  }

}
