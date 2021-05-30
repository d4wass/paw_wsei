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
        this.removeNote(this.id);
        this.editNote();
    }

    removeNote = (id: number) => {
        const removeBtn: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.remove');
        removeBtn.forEach(btn => btn.addEventListener('click', (e: Event) => {
            console.log(`usuwam ${(e.target as Element).id}`)
            let note = document.getElementById(`${id}`)
            note.remove()
        })
    }

    editNote = () => {
        const editBtn: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.edit')
        editBtn.forEach(btn => btn.addEventListener('click', () => console.log('edytuje')))
    }

};

