import { Injectable } from '@angular/core';
import { Note } from '../typing/note.interface';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    public saveToLS(key: string, value: Note[]): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public getFromLS(key: string): Note[] {
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : [];
    }
}
