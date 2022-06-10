import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note } from '../../typing/note.interface';
import { HashtagService } from '../../services/hashtag.service';

@Component({
    selector: 'app-edit-note',
    templateUrl: './edit-note.component.html',
    styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit, AfterViewInit {
    @ViewChild('noteTitle') noteTitleEl!: ElementRef<HTMLElement>;
    @ViewChild('noteDescription') noteDescriptionEl!: ElementRef<HTMLElement>;
    public title!: Note['title'];

    constructor(@Inject(MAT_DIALOG_DATA) public note: Note,
                public dialogRef: MatDialogRef<EditNoteComponent>,
                private tagService: HashtagService) {
    }

    public ngOnInit(): void {

    }

    public ngAfterViewInit() {
        this.tagService.setCaret(this.noteTitleEl.nativeElement);
    }

    public onPrint (event: KeyboardEvent, curEl: HTMLElement) {
        const wordsArr = curEl.innerText.split(' ');
        const lastWord = wordsArr[wordsArr.length - 1];

        if (lastWord.match(this.tagService.hashtagRegEx) && event.key === ' ') {
            this.tagService.addTag(this.note.tags, lastWord.match(this.tagService.hashtagRegEx)![0]);
        }

        setTimeout(() => this.tagService.bla(event, curEl), 0);
        this.note.title = this.noteTitleEl.nativeElement.innerText;
        this.note.description = this.noteDescriptionEl.nativeElement.innerText;
    }

    public onClose() {
        this.dialogRef.close({
            data: this.note,
        });
    }
}

