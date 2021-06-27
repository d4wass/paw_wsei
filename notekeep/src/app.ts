import { Note } from './note';
import { FirestoreStorageApp } from './AppStorage/FirestoreStorage';
import { LocalStorageApp } from './AppStorage/LocalStorage';
import { INote } from './interfaces';
import { isFirestore, isLocalStorage } from './AppStorage/config';

export class App {
    notes: INote[] = []
    db: FirestoreStorageApp | LocalStorageApp

    constructor() {
        this.bindEventToForm()
        this.db = this.setStorage()
        this.renderNotes()
    }

    setStorage = () => {
        if (isFirestore) {
            return new FirestoreStorageApp()
        }

        if (isLocalStorage) {
            return new LocalStorageApp(this.notes)
        }
    }

    getFormElements = (): [boolean[], string, string] => {
        const form: HTMLFormElement = document.querySelector('#form');
        const radioButtonsValue: boolean[] = [...form.elements["drone"]].map(item => item.checked);
        const titleValue = (<HTMLInputElement>form.elements[0]).value
        const contentValue = (<HTMLInputElement>form.elements[1]).value

        return [radioButtonsValue, titleValue, contentValue]
    }

    submitForm = () => {
        const noteElements = this.getFormElements();
        const note = new Note(noteElements[1], noteElements[2], { white: noteElements[0][0], green: noteElements[0][2], yellow: noteElements[0][1] });

        this.db = this.setStorage()

        this.notes.push(note);
        this.db.addNote(note);

        this.renderNotes()
    }

    renderNotes = (): void => {
        const notesToRender = this.db.getNotes()

        notesToRender.then(({notes}) => {
            if (document.querySelector("#notes").childElementCount === 0) {
                notes.forEach((note) => Note.renderNote(note, document.querySelector("#notes")));
            }
            else if (notes.length > document.querySelector("#notes").childElementCount) {
                Note.renderNote(notes[notes.length - 1], document.querySelector("#notes"))
            }
        })
    }

    bindEventToForm = () => {
        const form: HTMLFormElement = document.querySelector('#form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm()
            form.reset();
        })
    }

}

