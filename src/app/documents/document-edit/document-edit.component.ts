import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute, private documentService: DocumentService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if(params['id'] == null) {return}
        this.originalDocument = this.documentService.getDocument(this.id)
        if(this.originalDocument == null) {return}
        this.editMode = true;

        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    );
  }

  onSubmit(form:NgForm) {
    const value = form.value;
    const newDocument = new Document(this.documentService.getMaxId()+1,value.name, value.description, value.url, []);
    if(this.editMode) {
      this.documentService.updateDocument(this.originalDocument,newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents'])
  }

  onCancel() {
    this.router.navigate(['/documents'])
  }

}
