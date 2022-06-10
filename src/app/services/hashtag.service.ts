import { Injectable } from '@angular/core';
import { Note } from '../typing/note.interface';
import { LocalStorageService } from './local-storage.service';
import { setCaret } from '../helpers/caret.helper';

@Injectable({
    providedIn: 'root',
})
export class HashtagService {
    constructor(private lsService: LocalStorageService) {
    }

    get tags(): Note['tags'] {
        return this.lsService.getFromLS('notes').map((note) => note.tags ? note.tags : []).flat();
    }

    public get hashtagRegEx(): RegExp {
        return /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    }

    public highlightTags(string: string): string {
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
}
