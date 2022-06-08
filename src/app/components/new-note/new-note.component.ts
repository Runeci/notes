import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit, AfterViewInit {
  public editingStarted = false;
  public titleLabel = 'Title...';
  public descriptionEdited = false;

  description: any
  constructor() { }

  public ngOnInit(): void {

  }

  public ngAfterViewInit() {
  }

  public onEditStart() {
    this.editingStarted = true;
    this.titleLabel = 'Enter title...'
  }

  public onAdd() {

  }

  public onClose() {
    this.editingStarted = false;
  }
}
