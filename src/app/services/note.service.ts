import { Injectable } from '@angular/core';
import { Note } from '../typing/note.interface';
import { Subject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class NoteService {
    public notesChanged = new Subject<Note[]>();
    public notesArr: Note[] = [];

    constructor(private lsService: LocalStorageService) {
    }

    get notes(): Note[] {
        this.notesArr = this.lsService.getFromLS('notes');
        return this.lsService.getFromLS('notes');
    }

    public addNote(note: Note): void {
        this.notesArr.push(note);
        this.lsService.saveToLS('notes', this.notesArr);
        this.notesChanged.next([...this.notesArr]);
    }

    public deleteNote(index: number): void {
        this.notesArr.splice(index, 1);
        this.lsService.saveToLS('notes', this.notesArr);
        this.notesChanged.next([...this.notesArr]);
    }

    public updateNote(index: number, updatedNote: Note): void {
        this.notesArr[index] = updatedNote;
        this.lsService.saveToLS('notes', this.notesArr);
        this.notesChanged.next([...this.notesArr]);
    }

    public updateNotes(note: Note[]): void {
        this.lsService.saveToLS('notes', note);
        this.notesChanged.next(note);
    }
}
