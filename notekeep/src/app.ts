import { Note } from './note';
import { AppFirestoreStorage } from './AppStorage/AppFirestoreStorage'
import { INote } from './interfaces';
import { isFirestore, isLocalStorage } from './AppStorage/config';

export class App {
    notes: INote[] = []

    constructor() {
        this.bindEventToForm()
        this.renderNotes()
        this.bindEventToRemoveItem()
        //tutaj trzeba dodac jaki store ma być zaimplementowany jakaś metoda
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

        this.notes.push(note);

        if (isFirestore) {
            console.log('firestore')
        } else if (isLocalStorage) {
            this.saveDataToStorage()
        }

        this.renderNotes();
        note.bindEventToNote()
    }

    saveDataToStorage = (): void => {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    };

    renderNotes = (): void => {
        const wrapper: HTMLElement = document.querySelector("#notes");
        const notes: INote[] = JSON.parse(localStorage.notes)

        if (wrapper.childElementCount === 0) {
            notes.forEach(note => wrapper.appendChild(Note.createNoteElements(note)))
        } else if (notes.length > wrapper.childElementCount) {
            wrapper.appendChild(Note.createNoteElements(notes[notes.length - 1]))
        }
    }

    bindEventToForm = () => {
        const form: HTMLFormElement = document.querySelector('#form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm()
            form.reset();
        })
    }

    bindEventToRemoveItem = () => {
        const removeBtn: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.remove')
        removeBtn.forEach(btn => btn.addEventListener('click', (e: Event) => {
            let note = document.getElementById(`${(e.target as Element).id}`)
            note.remove()
        })
    }

    bindEventToEditItem = () => {
    }
}

