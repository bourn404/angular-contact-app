import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/win-ref.service';
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
  nativeWindow: any;

  constructor(private documentService: DocumentService, 
    private route: ActivatedRoute,
    private router: Router,
    private windRefService: WindRefService) { }

  ngOnInit() {
    this.nativeWindow = this.windRefService.getNativeWindow()
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

  onView() {
    if(this.document.url) {
      this.nativeWindow.open(this.document.url)
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['documents'])
  }

}
