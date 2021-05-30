import {EventEmitter, Injectable} from '@angular/core';
import {Document} from './document.model';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';

@Injectable({
    providedIn: 'root'
})

export class DocumentService {
    documentSelected = new EventEmitter<Document>();
    documentChanged = new EventEmitter<Document[]>();

    private documents: Document[] = []
    constructor() {
        this.documents = MOCKDOCUMENTS;
    }

    getDocuments() {
        return this.documents.slice();
    }

    getDocument(id: number): Document {
        return this.documents.find(document=>{return document.id===id});
    } 

    deleteDocument(document: Document) {
        if (!document) {
           return;
        }
        const pos = this.documents.indexOf(document);
        if (pos < 0) {
           return;
        }
        this.documents.splice(pos, 1);
        this.documentChanged.emit(this.documents.slice());
    }

}