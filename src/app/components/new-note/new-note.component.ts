import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../typing/note.interface';
import { HashtagService } from '../../services/hashtag.service';

@Component({
    selector: 'app-new-note',
    templateUrl: './new-note.component.html',
    styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent {
    @ViewChild('noteTitle') public noteTitleEl!: ElementRef<HTMLInputElement>;
    @ViewChild('noteDescription') public noteDescriptionEl!: ElementRef<HTMLDivElement>;

    public editingStarted = false;
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
        const newNote = {
            title: this.noteTitleEl.nativeElement.innerText,
            description: this.noteDescriptionEl.nativeElement.innerText,
            tags: this.tags,
        };
        this.noteService.addNote(newNote);
        this.clearNoteForm();
    }

    public onClose(): void {
        this.editingStarted = false;
        this.clearNoteForm();
    }

    public onPrint(event: KeyboardEvent, curEl: HTMLElement) {
        const wordsArr = curEl.innerText.split(' ');
        const lastWord = wordsArr[wordsArr.length - 1];

        if (lastWord.match(this.tagService.hashtagRegEx) && event.key === ' ') {
            this.tagService.addTag(this.tags, lastWord);
        }

        curEl.innerHTML = this.tagService.highlightTags(curEl.innerText);
        this.tagService.setCaret(curEl);
    }

    private clearNoteForm() {
        this.noteTitleEl.nativeElement.innerHTML = '';
        this.noteDescriptionEl.nativeElement.innerHTML = '';
        this.tags = [];
    }
}
