import { Component, OnInit } from '@angular/core';
import { Note } from '../../typing/note.interface';
import { NoteService } from '../../services/note.service';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { FilterService } from '../../services/filter.service';

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
                private filterService: FilterService
    ) {
    }

    public ngOnInit(): void {
        this.notes = this.noteService.notes;
        this.filteredNotes = this.noteService.notes;
        this.noteService.notesChanged.subscribe(
            (notes) => {
                this.filteredNotes = notes;
            }
        );

        this.filterService.filterChanged
            .subscribe(
                (filterTags) => !filterTags?.length ? this.filteredNotes = this.notes
                    : this.filteredNotes = this.filterService.filterByTags(filterTags, this.notes)
            );
    }

    public onDelete(index: number): void {
        this.noteService.deleteNote(index);
        this.filteredNotes = this.noteService.notes;
    }

    public onEdit(index: number): void {
        const note = this.notes[index];
        const dialogRef = this.matDialog.open(EditNoteComponent, {
            data: note,
            width: '400px',
        });

        dialogRef.afterClosed().subscribe(
            (note) => this.noteService.updateNote(index, note.data));
    }
}
