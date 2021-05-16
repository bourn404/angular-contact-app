import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {

  @Output() documentWasSelected = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(1,'My First Document','The OG document with OG content', 'https://www.carsonfairbourn.com',[]),
    new Document(2,'My Second Document','Not the OG document with OG content', 'https://www.carsonfairbourn.com',[]),
    new Document(3,'My Third Document','Could be better. Could be worse.', 'https://www.carsonfairbourn.com',[]),
    new Document(4,'My Fourth Document','And another one...', 'https://www.carsonfairbourn.com',[]),
    new Document(5,'The Last Document','A great conclusion to the series.', 'https://www.carsonfairbourn.com',[])
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onDocumentSelected(document: Document) {
    this.documentWasSelected.emit(document);
  }

}
