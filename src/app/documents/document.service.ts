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
        this.http.get<Document[]>('http://localhost:3000/documents')
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
        this.http.put('http://localhost:3000/documents',documents)
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

    addDocument(document: Document) {
        if (!document) {
            return;
        }
      
        // make sure id of the new Document is empty
        document.id = '';
      
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
      
        // add to database
        this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
            document,
            { headers: headers })
            .subscribe(
              (responseData) => {
                // add new document to documents
                this.documents.push(responseData.document);
                this.documentListChanged.next(this.documents.slice())
              }
        );
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
    
        const pos = this.documents.findIndex(d => d.id === document.id);
    
        if (pos < 0) {
          return;
        }
    
        // delete from database
        this.http.delete('http://localhost:3000/documents/' + document.id)
          .subscribe(
            (response: Response) => {
              this.documents.splice(pos, 1);
              this.documentListChanged.next(this.documents.slice())
            }
          );
      }

}