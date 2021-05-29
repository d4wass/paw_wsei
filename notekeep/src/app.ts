import { Note } from './note';
import { INote } from './interfaces';
import { noteItem } from './utils';

export class App {
    notes: INote[] = []

    constructor() {
        this.bindEventToForm()
        this.renderNotes()
    }

    submitForm = () => {
        const form: HTMLFormElement = document.querySelector('#form');
        const radioBtnList: boolean[] = [...form.elements["drone"]].map(item => item.checked);
        const titleValue: string = form.elements["title"].value
        const contentValue: string = form.elements["content"].value

        const note = new Note(titleValue, contentValue, { white: radioBtnList[0], green: radioBtnList[2], yellow: radioBtnList[1] });

        this.notes.push(note);
        this.saveDataToStorage()
        this.renderNotes();
    }

    saveDataToStorage = (): void => {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    };

    renderNotes = (): void => {
        const wrapper: HTMLElement = document.querySelector("#notes");
        const items: INote[] = JSON.parse(localStorage.notes)
        items.forEach(item => console.log(noteItem(item)))
        wrapper.innerHTML = noteItem(items[0])
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

