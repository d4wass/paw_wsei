import { INote } from './interfaces';
import { getCurrentDate, createId } from './utils';

export class Note implements INote {
    id: number;
    title: string;
    content: string;
    color: {
        white: boolean,
        green: boolean,
        yellow: boolean,
    };
    readonly createdDate: string;

    constructor(title: string, content: string , color: {white: boolean, green: boolean, yellow: boolean}) {
        this.title = title;
        this.content = content;
        this.color = color;
        this.createdDate = getCurrentDate();
        this.id = createId()
        this.bindEventToNote()
    }

    removeNote = (id: number) => {
        const noteBtn: HTMLButtonElement = document.querySelector(`${id}`)
        noteBtn.addEventListener('click', () => console.log(JSON.parse(localStorage.notes)))
        const notes: INote[] = JSON.parse(localStorage.notes);
        console.log(notes.filter(item => item.id !== id));
        let note = document.getElementById(`${id}`)
            note.remove()

    }

    editNote = () => {
        const editBtn: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.edit')
        editBtn.forEach(btn => btn.addEventListener('click', () => console.log('edytuje')))
    }

    bindEventToNote = () => {
        document.addEventListener('click', (e) => {
            if (e.target && (e.target as Element).id === `${this.id}`) {
                this.removeNote(this.id)
            }
        })
    }

};

