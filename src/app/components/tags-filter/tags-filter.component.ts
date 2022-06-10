import { Component, OnInit } from '@angular/core';
import { HashtagService } from '../../services/hashtag.service';
import { Note } from '../../typing/note.interface';
import { FormControl } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { NoteService } from '../../services/note.service';

@Component({
    selector: 'app-tags-filter',
    templateUrl: './tags-filter.component.html',
    styleUrls: ['./tags-filter.component.scss']
})
export class TagsFilterComponent implements OnInit {
    public tags: Note['tags'];
    public tagSelection = new FormControl('');

    constructor(private tagService: HashtagService,
                private filterService: FilterService,
                private noteService: NoteService,
    ) {
    }

    public ngOnInit(): void {
        this.tags = this.tagService.tags;

        this.noteService.notesChanged.subscribe(
            () => this.tags = this.tagService.tags
        );
    }

    public onFilter(): void {
        if (!this.tagSelection.value.length) {
            this.filterService.filterChanged.next([]);
        }
        this.filterService.filterChanged.next(this.tagSelection.value);
    }
}
