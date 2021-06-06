import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import {Document} from './document.model';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';

@Injectable({
    providedIn: 'root'
})

export class DocumentService {
    documentListChanged = new Subject<Document[]>();

    private documents: Document[] = []
    private maxDocumentId: number = 0;
    constructor() {
        this.documents = MOCKDOCUMENTS;
        this.maxDocumentId = this.getMaxId();
    }

    getDocuments() {
        return this.documents.slice();
    }

    getDocument(id: number): Document {
        return this.documents.find(document=>{return document.id===id});
    } 

    
    getMaxId(): number {

        let maxId = 0

        this.documents.forEach((document)=>{
            if(document.id > maxId) {
                maxId = document.id;
            }
        })

        return maxId;
    }

    addDocument(newDocument: Document) {
        if(!newDocument) {
            return
        }
    
        this.maxDocumentId++
        newDocument.id = this.maxDocumentId

        this.documents.push(newDocument)
        this.documentListChanged.next(this.documents.slice())
    }

    updateDocument(originalDocument: Document, newDocument: Document) {
        if(!originalDocument || !newDocument) {
            return
        }
    
        let pos = this.documents.indexOf(originalDocument)
        if(pos < 0){
            return
        }
    
        newDocument.id = originalDocument.id
        this.documents[pos] = newDocument
        this.documentListChanged.next(this.documents.slice())
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
        this.documentListChanged.next(this.documents.slice());
    }

}