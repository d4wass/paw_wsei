import { INote, Color } from './interfaces';
import { Modal } from './modal';
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

        removeBtn.addEventListener('click', (e: Event) => Note.removeNoteEvent(e))
        editBtn.addEventListener('click', ((e: Event) => Note.editNoteEvent(e)))

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

    static removeNoteEvent = (e: Event) => {
        const note = document.getElementById(`${(e.target as Element).id}`)
        const noteStorage: INote[] = JSON.parse(localStorage.getItem('notes'))

        localStorage.setItem('notes', JSON.stringify(noteStorage.filter(item => item.id !== (e.target as Element).id)))
        note.remove()
    }

    static editNoteEvent = (e: Event) => {
        const note = document.getElementById(`${(e.target as Element).id}`)
        const noteStorage: INote[] = JSON.parse(localStorage.getItem('notes'))
        const noteToEdit: INote[] = noteStorage.filter(note => note.id === (e.target as Element).id)

        Modal.showModal(noteToEdit[0], document.body)
        //tutaj nowa instancja modala z danymi które posiada notatka do edycji w inputach

        console.log('edycja')
    }


    static renderNote = (note: any, parent: HTMLElement) => {
        const createdNote = Note.createNoteElements(note)
        parent.appendChild(createdNote)
    }
};

