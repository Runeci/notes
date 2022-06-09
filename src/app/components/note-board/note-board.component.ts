import { Component, OnInit } from '@angular/core';
import { Note } from '../../typing/note.interface';
import { NoteService } from '../../services/note.service';

@Component({
    selector: 'app-note-board',
    templateUrl: './note-board.component.html',
    styleUrls: ['./note-board.component.scss']
})
export class NoteBoardComponent implements OnInit {
    public notes!: Note[];

    constructor(private noteService: NoteService) {
    }

    public ngOnInit(): void {
        this.notes = this.noteService.notes;
        this.noteService.notesChanged.subscribe(
            (notes) => this.notes = notes
        )
    }

    public onDelete(index: number) {
        this.noteService.deleteNote(index);
    }

    public onUpdate(index: number) {
        const newNote = {
            title: 'fe',
            description: 'terf',
            tags: ['2', ',']
        };
        this.noteService.updateNote(index, newNote)
    }
}
