import {EventEmitter, Injectable} from '@angular/core';
import {Document} from './document.model';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';

@Injectable({
    providedIn: 'root'
})

export class DocumentService {
    documentSelected = new EventEmitter<Document>();

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

}