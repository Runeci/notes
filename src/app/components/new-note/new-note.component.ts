import { Component, ElementRef, ViewChild } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../typing/note.interface';
import { HashtagService } from '../../services/hashtag.service';
import { setCaret } from '../../helpers/caret.helper';

@Component({
    selector: 'app-new-note',
    templateUrl: './new-note.component.html',
    styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent {
    @ViewChild('noteTitle') public noteTitleEl!: ElementRef<HTMLInputElement>;
    @ViewChild('noteDescription') public noteDescriptionEl!: ElementRef<HTMLDivElement>;

    public editingStarted = false;
    public newNote: Note = {
        title: '',
        description: '',
        tags: []
    };

    public tags: Note['tags'] = [];

    constructor(private noteService: NoteService,
                private tagService: HashtagService
    ) {
    }

    public onEditStart(): void {
        if (this.editingStarted) {
            return;
        }
        this.editingStarted = true;
    }

    public onAdd(): void {
        this.noteService.addNote({ ...this.newNote, tags: this.tags });
        this.clearNoteForm();
    }

    public onClose(): void {
        this.editingStarted = false;
        this.clearNoteForm();
    }

    public onPrint(event: KeyboardEvent, curEl: HTMLElement): void {
        const wordsArr = curEl.innerText.split(' ');
        const lastWord = wordsArr[wordsArr.length - 1];
        const tagAlreadyExists = this.tags
            ?.some((tag) => tag.trim() === lastWord.slice(1).trim());

        if (lastWord.match(this.tagService.hashtagRegEx) && event.key === ' ') {
            if (tagAlreadyExists) {
                return;
            }
            this.tagService.addTag(this.tags, lastWord.match(this.tagService.hashtagRegEx)![0]);
        }

        curEl.innerHTML = this.tagService.highlightTags(curEl.innerText);

        this.newNote = {
            title: this.noteTitleEl.nativeElement.innerText,
            description: this.noteDescriptionEl.nativeElement.innerText,
        };
        setCaret(curEl);
    }

    private clearNoteForm(): void {
        this.noteTitleEl.nativeElement.innerHTML = '';
        this.noteDescriptionEl.nativeElement.innerHTML = '';
        this.tags = [];
    }
}
