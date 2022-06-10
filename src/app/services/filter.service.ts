import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from '../typing/note.interface';

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    public filterChanged = new Subject<Note['tags']>();

    public filterByTags(filterTags: string[], notes: Note[]): Note[] {
       return notes.filter(note => {
            if (!note.tags) {
                return false;
            }
            return note.tags.some(tag => filterTags?.includes(tag));
        });
    }
}
