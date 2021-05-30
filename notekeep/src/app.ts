import { Note } from './note';
import { INote } from './interfaces';
import { noteItem } from './utils';

export class App {
    notes: INote[] = []

    constructor() {
        this.bindEventToForm()
        this.renderNotes()
        this.bindEventToRemoveItem()
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
        note.editNote()
        note.removeNote(note.id)
    }

    saveDataToStorage = (): void => {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    };

    renderNotes = (): void => {
        const wrapper: HTMLElement = document.querySelector("#notes");
        const items: INote[] = JSON.parse(localStorage.notes)
        let arrayTemplate: string[] = [];

        if (wrapper.childElementCount === 0) {
            items.forEach(item => arrayTemplate.push(noteItem(item)))
            wrapper.innerHTML += arrayTemplate.join('')
        } else if (items.length > wrapper.childElementCount) {
            wrapper.innerHTML += noteItem(items[items.length - 1])
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

