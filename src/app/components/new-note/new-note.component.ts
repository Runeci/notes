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
                private tagService: HashtagService,
                private renderer: Renderer2) {
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
        this.noteTitleEl.nativeElement.innerHTML = '';
        const p =  this.renderer.createElement('p');
        p.contentEditable=true;
        this.renderer.appendChild(this.noteTitleEl.nativeElement, p);

        this.noteDescriptionEl.nativeElement.innerHTML = '';
        this.tags = [];
    }

    public onClose(): void {
        this.editingStarted = false;
        this.noteTitleEl.nativeElement.innerHTML = '';
        this.noteDescriptionEl.nativeElement.innerHTML = '';
    }

    public toggleLabel(containerEl: HTMLElement): boolean {
        return !!containerEl.innerText.length;
    }

    public focus(event: Event) {
        const parentEl = event.target as HTMLElement;
        const lastElIndex = parentEl.childNodes.length - 1;
        const lastEl = parentEl.childNodes[lastElIndex] as HTMLElement;
        this.tagService.setCaret(lastEl);
    }

    public onPrint(event: KeyboardEvent, curEl: HTMLElement, parentEl: HTMLElement) {
        if (event.key !== ' ') {
            return;
        }

        const wordsArr = curEl.innerText.split(' ');
        const lastWord = wordsArr[wordsArr.length - 1];

        if (lastWord.startsWith('#') && lastWord.trim().length !== 1) {
            wordsArr.splice(wordsArr.indexOf(lastWord));
            curEl.innerText = wordsArr.join(' ');

            this.tagService.addTag(this.tags, lastWord);

            const newTag = this.tagService.createTagEl(lastWord);

            newTag.addEventListener('keyup', (event) => {
                this.tagService.moveCaretBack(event, parentEl);
            });

            this.renderer.appendChild(parentEl, newTag);

            const paragraph = this.renderer.createElement('p') as HTMLSpanElement;
            paragraph.contentEditable = 'true';
            paragraph.addEventListener('keyup', (event) => {
                    this.onPrint(event, paragraph, parentEl);
                    this.tagService.moveCaretBack(event, parentEl);
                }
            );

            this.renderer.appendChild(parentEl, paragraph);
            const lastElIndex = parentEl.childNodes.length - 1;
            const lastEl = parentEl.childNodes[lastElIndex] as HTMLElement;
            this.tagService.setCaret(lastEl);
        }
    }
}
