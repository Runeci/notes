import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewNoteComponent } from './components/new-note/new-note.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutofocusDirective } from './directives/autofocus.directive';
import { NoteBoardComponent } from './components/note-board/note-board.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';
import { HighlightTagsPipe } from './pipes/highlightTags.pipe';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { TagsFilterComponent } from './components/tags-filter/tags-filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [
        AppComponent,
        NewNoteComponent,
        AutofocusDirective,
        NoteBoardComponent,
        EditNoteComponent,
        HighlightTagsPipe,
        TagsFilterComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        NoopAnimationsModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
