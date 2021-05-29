import { INote } from './interfaces';
import { getCurrentDate, noteItem } from './utils';

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
    }

    renderNote = (note: INote): string => noteItem(note)

    // saveNoteToStorage = (note: INote) => {
    //     localStorage.setItem('notes', JSON.stringify(this.notes));
    // }

};

