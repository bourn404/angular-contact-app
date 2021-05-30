import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  id: number;

  constructor(private documentService: DocumentService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.document = this.documentService.getDocument(this.id);
      }
    )
  }

  onEditDocument() {
    this.router.navigate(['edit'],{relativeTo:this.route})
  }

}
