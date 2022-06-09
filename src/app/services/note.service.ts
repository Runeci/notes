import { Injectable } from '@angular/core';
import { Note } from '../typing/note.interface';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NoteService {
    public notesChanged = new Subject<Note[]>();
    public notesArr: Note[] = [
        { title: 'bla1', description: 'bla1-desc', tags: ['1', '1'] },
        { title: 'bla2', description: 'bla2-descr', tags: ['1', '1'] },
    ];

    constructor() {
    }

    get notes(): Note[] {
        return this.notesArr.slice();
    }

    public addNote(note: Note): void {
        this.notesArr.push(note);
        this.notesChanged.next([...this.notesArr]);
    }

    public deleteNote(index: number): void {
        this.notesArr.splice(index, 1);
        this.notesChanged.next([...this.notesArr]);
    }

    public updateNote(index: number, updatedNote: Note) {
        this.notesArr[index] = updatedNote;
        this.notesChanged.next([...this.notesArr]);
    }
}
