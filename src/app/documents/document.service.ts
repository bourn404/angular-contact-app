import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import {Document} from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class DocumentService {
    documentListChanged = new Subject<Document[]>();

    documents: Document[] = []
    private maxDocumentId: string = "0";
    constructor(private http: HttpClient) {
        this.getDocuments();
    }

    getDocuments() {
        this.http.get<Document[]>('https://angular-contacts-app-e446a-default-rtdb.firebaseio.com/documents.json')
        .subscribe( (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort();
          this.documentListChanged.next(this.documents.slice());
        }, (error:any) => {
          console.log(error);
        })
    }

    storeDocuments() {
        let documents = JSON.stringify(this.documents);
        this.http.put('https://angular-contacts-app-e446a-default-rtdb.firebaseio.com/documents.json',documents)
        .subscribe(response => {
            this.documentListChanged.next(this.documents.slice())
        })
    }

    getDocument(id: string): Document {
        return this.documents.find(document=>{return document.id===id});
    } 

    
    getMaxId(): string {

        let maxId = 0

        this.documents.forEach((document)=>{
            if(parseInt(document.id) > maxId) {
                maxId = parseInt(document.id);
            }
        })

        return maxId.toString();
    }

    addDocument(newDocument: Document) {
        if(!newDocument) {
            return
        }
        
        let newMaxDocId = parseInt(this.maxDocumentId)
        newDocument.id = (newMaxDocId++).toString()

        this.documents.push(newDocument)
        this.storeDocuments()
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
        this.storeDocuments()
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
        this.storeDocuments()
    }

}