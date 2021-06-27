import { INote, AppStorage } from '../interfaces';

export class LocalStorageApp implements AppStorage{
    db: void

    constructor(notes: INote[] | []) {
        this.db = localStorage.setItem('notes', JSON.stringify(notes))
    }

    async addNote(note: INote) {
        const notes: INote[] = JSON.parse(localStorage.getItem('notes'))
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes))

        return Promise.resolve();
    }

    async deleteNote(id: string) {
        const notes: INote[] = JSON.parse(localStorage.getItem('notes'))
        notes.filter(note => note.id !== id);
        localStorage.setItem('notes', JSON.stringify(notes))

        return Promise.resolve();
    }

    async updateNote(id: string, note: INote) {
        const notes: INote[] = JSON.parse(localStorage.getItem('notes'))
        const noteToUpdate = notes.filter(note => note.id === id);

        return Promise.resolve()
    }

    async getNote(id: INote['id']) {
        const notes: INote[] = JSON.parse(localStorage.getItem('notes'))
        const getNote = notes.filter(note => note.id === id);
        return Promise.resolve({note: getNote[0]})
    }

    async getNotes() {
        const notes: INote[] = JSON.parse(localStorage.notes);
        return Promise.resolve({size: notes.length, notes: notes})
    }
}
