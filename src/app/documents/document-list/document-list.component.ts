import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  private dlChangeSub: Subscription;

  constructor(private documentService: DocumentService, 
      private router: Router,
      private route: ActivatedRoute) { }

  ngOnInit() {
    this.documents = this.documentService.documents;
    this.dlChangeSub = this.documentService.documentListChanged.subscribe(
      (documents:Document[]) => {
        this.documents = documents;
      }
    )
  }

  ngOnDestroy() {
    this.dlChangeSub.unsubscribe();
  }

  onNewDocument() {
    this.router.navigate(['new'], {relativeTo:this.route});
  }

}
