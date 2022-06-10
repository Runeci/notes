import { Injectable } from '@angular/core';
import { Note } from '../typing/note.interface';
import { LocalStorageService } from './local-storage.service';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HashtagService {
    constructor(private lsService: LocalStorageService) {
    }

    get tags(): Note['tags']{
        return this.lsService.getFromLS('notes').map((note) => note.tags ? note.tags : []).flat()
    }

    public get hashtagRegEx() {
        return /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    }

    public highlightTags(string: string) {
        const newStr = string
            .split(' ')
            .map((word) => {
                if (word.match(this.hashtagRegEx)) {
                    return word.replace(word, `<span class="highlight"">${ word }</span>`);
                } else {
                    return word;
                }
            });
        return `${ newStr.join(' ') }`;
    }

    public addTag(tagsArr: Note['tags'], tag: string): void {
        tagsArr?.push(tag.slice(1));
    }

    public setCaret(el: Element): void {
        const focusedEl = el as HTMLElement;
        const selection = window.getSelection();
        const range = document.createRange();
        selection?.removeAllRanges();
        range.selectNodeContents(el);
        range.collapse(false);
        selection?.addRange(range);
        focusedEl.focus();
    }

    public bla(event: KeyboardEvent, curEl: HTMLElement) {

        curEl.innerHTML = this.highlightTags(curEl.innerText);
        this.setCaret(curEl);
    }
}
