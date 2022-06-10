import { Component, OnInit } from '@angular/core';
import { Note } from '../../typing/note.interface';
import { NoteService } from '../../services/note.service';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { HashtagService } from '../../services/hashtag.service';

@Component({
    selector: 'app-note-board',
    templateUrl: './note-board.component.html',
    styleUrls: ['./note-board.component.scss']
})
export class NoteBoardComponent implements OnInit {
    public notes!: Note[];
    public filteredNotes!: Note[];

    constructor(private noteService: NoteService,
                private matDialog: MatDialog,
                private tagService: HashtagService,
    ) {
    }

    public ngOnInit(): void {
        this.notes = this.noteService.notes;
        this.filteredNotes = this.noteService.notes;
        this.noteService.notesChanged.subscribe(
            (notes) => this.notes = notes
        );

        this.tagService.filterChanged
            .subscribe(
                (filteredTags) => {
                    if (!filteredTags?.length) {
                        this.filteredNotes = this.notes;
                    } else {
                        this.filteredNotes = this.notes.filter(note => {
                            if (!note.tags) {
                                return false;
                            }
                            return note.tags.some(tag => filteredTags?.includes(tag));
                        });
                    }
                }
            );
    }

    public onDelete(index: number) {
        this.noteService.deleteNote(index);
    }

    public onEdit(index: number) {
        const note = this.notes[index];
        const dialogRef = this.matDialog.open(EditNoteComponent, {
            data: note,
            width: '400px',
        });

        dialogRef.afterClosed().subscribe(
            (note) => this.noteService.updateNote(index, note.data));
    }
}
