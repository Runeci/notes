import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note } from '../../typing/note.interface';
import { HashtagService } from '../../services/hashtag.service';
import { setCaret } from '../../helpers/caret.helper';

@Component({
    selector: 'app-edit-note',
    templateUrl: './edit-note.component.html',
    styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit, AfterViewInit {
    @ViewChild('noteTitle') noteTitleEl!: ElementRef<HTMLElement>;
    @ViewChild('noteDescription') noteDescriptionEl!: ElementRef<HTMLElement>;

    private editedNote!: Note;

    constructor(@Inject(MAT_DIALOG_DATA) public note: Note,
                public dialogRef: MatDialogRef<EditNoteComponent>,
                private tagService: HashtagService) {
    }


    public ngOnInit(): void {
        this.editedNote = {...this.note};
        this.editedNote.tags = this.note.tags ?  [...this.note.tags] : [];
    }

    public ngAfterViewInit() {
        setCaret(this.noteTitleEl.nativeElement);
    }

    public onPrint (event: KeyboardEvent, curEl: HTMLElement) {
        const wordsArr = curEl.innerText.split(' ');
        const lastWord = wordsArr[wordsArr.length - 1];

        const tagAlreadyExists = this.note.tags
            ?.some((tag) => tag.trim() === lastWord.slice(1).trim());

        if (lastWord.match(this.tagService.hashtagRegEx) && event.key === ' ') {
            if (tagAlreadyExists) {
                return;
            }
            this.tagService.addTag(this.note.tags, lastWord.match(this.tagService.hashtagRegEx)![0]);
        }

        setTimeout(() => {
            curEl.innerHTML = this.tagService.highlightTags(curEl.innerText);
            setCaret(curEl);
        }, 0);

        this.editedNote.title = this.noteTitleEl.nativeElement.innerText;
        this.editedNote.description = this.noteDescriptionEl.nativeElement.innerText;
    }

    public onClose() {
        this.dialogRef.close({
            data: {...this.editedNote, tags: this.note.tags},
        });
    }
}

