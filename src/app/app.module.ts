import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewNoteComponent } from './components/new-note/new-note.component';
import { FormsModule } from '@angular/forms';
import { AutofocusDirective } from './directives/autofocus.directive';
import { NoteBoardComponent } from './components/note-board/note-board.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';
import { HighlightTagsPipe } from './pipes/highlightTags.pipe';

@NgModule({
    declarations: [
        AppComponent,
        NewNoteComponent,
        AutofocusDirective,
        NoteBoardComponent,
        EditNoteComponent,
        HighlightTagsPipe,
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
