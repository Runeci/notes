import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlightTags',
})
export class HighlightTagsPipe implements PipeTransform {
    transform(value: string): string {
        const regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
        const match = value.match(regex);

        if (!match) {
            return value;
        }

        return value.replace(regex, `<span class='highlight'>${match[0]} </span>`);
    }
}
