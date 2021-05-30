import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {

  documents: Document[] = [];
  constructor(private documentService: DocumentService, 
      private router: Router,
      private route: ActivatedRoute) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }

  onNewDocument() {
    this.router.navigate(['new'], {relativeTo:this.route});
  }

}
