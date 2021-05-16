import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Document } from '../../document.model';

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.scss']
})
export class DocumentItemComponent implements OnInit {
  @Input() document: Document;
  @Output() documentSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected() {
    this.documentSelected.emit();
  }

}
