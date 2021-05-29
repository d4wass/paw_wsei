import { INote } from './interfaces';
import { getCurrentDate } from './utils';

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
        this.removeNote();
        this.editNote();
    }

    removeNote = () => {
        const removeBtn: NodeListOf<HTMLButtonElement> = document.querySelectorAll('#remove');
        removeBtn.forEach(btn => btn.addEventListener('click', () => console.log('usuwam')))
    }

    editNote = () => {
        const editBtn: NodeListOf<HTMLButtonElement> = document.querySelectorAll('#edit')
        editBtn.forEach(btn => btn.addEventListener('click', () => console.log('edytuje')))
    }

};

