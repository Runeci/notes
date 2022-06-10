import { Pipe, PipeTransform } from '@angular/core';
import { HashtagService } from '../services/hashtag.service';

@Pipe({
    name: 'highlightTags',
})
export class HighlightTagsPipe implements PipeTransform {
    constructor(private tagsService: HashtagService) {
    }

    transform(value: string): string {
        const regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
        const match = value.match(regex);

        if (!match) {
            return value;
        }

        if (!this.tagsService.tags?.includes(match[0].slice(1))) {
            return value;
        }

        return value.replace(regex, `<span class='highlight'>${ match[0] } </span>`);
    }
}
