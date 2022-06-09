import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Note } from '../typing/note.interface';

@Injectable({
    providedIn: 'root',
})
export class HashtagService {
    private renderer: Renderer2;

    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    public get hashtagRegEx() {
        return /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    }

    public highlightTags(string: string) {
        const newStr = string
            .split(' ')
            .map((word) => {
                if (word.match(this.hashtagRegEx)) {
                    return word.replace(word, `<span style="color:blue">${ word }</span>`);
                } else {
                    return word;
                }
            })
        return `${ newStr.join(' ') }`
    }

    public addTag(tagsArr: Note['tags'], tag: string): void {
        tagsArr?.push(tag.slice(1));
    }

    public checkIfTag(string: string): boolean {
        const regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
        return !!string.match(regex);
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
}
