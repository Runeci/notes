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

    public addTag(tagsArr: Note['tags'], tag: string): void {
        tagsArr?.push(tag.slice(1));
    }

    public createTagEl(tagText: string): HTMLSpanElement {
        const newTag = this.renderer.createElement('span') as HTMLSpanElement;
        newTag.innerText = ` ${ tagText }`;
        newTag.contentEditable = 'true';
        this.renderer.setStyle(newTag, 'color', 'blue');
        this.renderer.setStyle(newTag, 'outline', 'none');
        return newTag;
    }

    public getHashTags(inputText: string): string[] {
        const regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
        const matches = [];
        let match;

        while ((match = regex.exec(inputText))) {
            matches.push(match[1]);
        }
        return matches;
    }

    public setCaret(el: Element) {
        const focusedEl = el as HTMLElement;
        const selection = window.getSelection();
        const range = document.createRange();
        selection?.removeAllRanges();
        range.selectNodeContents(el);
        range.collapse(false);
        selection?.addRange(range);
        focusedEl.focus();
    }

    public moveCaretBack(event: KeyboardEvent, containerEl: HTMLElement) {
        if (event.key !== 'Backspace' && containerEl.childNodes.length !== 1) {
            return;
        }

        if (containerEl.lastElementChild?.innerHTML.length === 0) {
            containerEl.lastElementChild?.remove();
            const lastEl = containerEl.lastChild as HTMLAnchorElement;
            this.setCaret(lastEl);
        }
    }
}
