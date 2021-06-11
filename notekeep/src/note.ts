import { INote, Color } from './interfaces';
import { getCurrentDate, createId } from './utils';

export class Note implements INote {
    id: string;
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

    static createNoteElements = (note: INote) => {
        const wrapper = document.createElement('div')
        const title = document.createElement('h3')
        const data = document.createElement('span')
        const paragraph = document.createElement('p')
        const content = document.createElement('div')
        const removeBtn = document.createElement('button');
        const editBtn = document.createElement('button');
        const btnWrapper = document.createElement('div');
        const contentWrapper = document.createElement('div');

        const colorOfNote = Object.keys(note.color).filter((key: string) => note.color[key])[0]

        wrapper.className = `note_${colorOfNote}`;
        content.className = 'note_content';
        btnWrapper.className = 'note_content_btn';
        editBtn.className = 'edit';
        removeBtn.className = 'remove';
        data.className = 'note_content_data';
        paragraph.className = 'note_content_paragraph'
        contentWrapper.className = 'note_content_wrapper';

        wrapper.id = note.id
        removeBtn.id = note.id
        editBtn.id = note.id

        title.innerText = note.title;
        paragraph.innerText = note.content;
        data.innerText = note.createdDate;
        editBtn.innerText = 'edit';
        removeBtn.innerText = 'remove';

        btnWrapper.append(editBtn, removeBtn)
        contentWrapper.append(paragraph, data)
        content.append(contentWrapper, btnWrapper)
        wrapper.append(title, content)

        return wrapper;
    }

    renderNote = (note: INote, parent: HTMLElement) => {
        const createdNote = this.createNoteElements(note)
        parent.appendChild(createdNote)
    }

    removeNote = (id: string) => {
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

