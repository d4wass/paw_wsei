import { INote, Color } from './interfaces';
import { Modal } from './modal';
import { getCurrentDate, createId } from './utils';
import { isFirestore, isLocalStorage } from './AppStorage/config';
import { FirestoreStorageApp } from './AppStorage/FirestoreStorage';

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

        if (isFirestore) {
            const firestore = FirestoreStorageApp.init();
            firestore.deleteNote((e.target as Element).id)
        } else if (isLocalStorage) {
            const noteStorage: INote[] = JSON.parse(localStorage.getItem('notes'))
            localStorage.setItem('notes', JSON.stringify(noteStorage.filter(item => item.id !== (e.target as Element).id)))
        }

        note.remove()
    }

    static editNoteEvent = (e: Event) => {
        const note = document.getElementById(`${(e.target as Element).id}`)

        if (isFirestore) {

            let noteToEdit: INote;
            const firestore = FirestoreStorageApp.init();
            console.log(firestore.getNote((e.target as Element).id))
            firestore.getNote((e.target as Element).id).then(res => res.note = noteToEdit).then(
                () => Modal.showModal(noteToEdit, document.body)
            )

        } else if (isLocalStorage) {

            let noteToEdit: INote[];
            const noteStorage: INote[] = JSON.parse(localStorage.getItem('notes'))
            noteToEdit = noteStorage.filter(note => note.id === (e.target as Element).id);
            Modal.showModal(noteToEdit[0], document.body)

        }


    }

    static saveNote = (title: string, content: string, id: string) => {
        let noteStorage: INote[] = JSON.parse(localStorage.getItem('notes'))
        let noteToEdit: INote = noteStorage.filter(note => note.id === id)[0];
        const notesWrapper: HTMLDivElement = document.querySelector('.notes');

        noteToEdit.title = title;
        noteToEdit.content = content;

        noteStorage.filter(item => item.id !== id).push(noteToEdit);
        localStorage.setItem('notes', JSON.stringify(noteStorage))

        notesWrapper.innerHTML = ''
        noteStorage.forEach(item => Note.renderNote(item, notesWrapper))
    }

    static renderNote = (note: any, parent: HTMLElement) => {
        const createdNote = Note.createNoteElements(note)
        parent.appendChild(createdNote)
    }
};

