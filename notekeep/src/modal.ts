import { INote, Color } from './interfaces';
import { getCurrentDate, createId } from './utils';

export class Modal {
    id: string;
    title: string;
    content: string;
    color: {
        white: boolean,
        green: boolean,
        yellow: boolean,
    };
    readonly createdDate: string;

    constructor(title: string, content: string, color: { white: boolean, green: boolean, yellow: boolean }) {
        this.title = title;
        this.content = content;
        this.color = color;
        this.createdDate = getCurrentDate();
        this.id = createId()
    }

    static createModalElements = (note: INote) => {
        const form = document.createElement('form');
        const titleInput = document.createElement('input');
        const textArea = document.createElement('textarea');
        const titleLabel = document.createElement('label');
        const textareaLabel = document.createElement('label');
        const radio = document.createElement('input');
        const radioLabel = document.createElement('label');
        const radioTitle = document.createElement('h5');
        const saveBtn = document.createElement('button')

        const textAreaWrapper = document.createElement('div');
        const formTextareaWrapper = document.createElement('div');
        const formWrapper = document.createElement('div');

        form.className = 'form';
        formWrapper.className = 'form_wrapper';

        titleInput.className = 'form_wrapper__input'
        titleInput.type = 'text';
        titleInput.id = 'title';
        titleInput.name = 'title';
        titleLabel.className = 'form_wrapper__label'
        titleLabel.innerText = 'Title'

        textArea.className = 'form_wrapper__textarea'
        textArea.type = 'text';
        textArea.id = 'content';
        textArea.name = 'content';
        textareaLabel.className = 'form_wrapper__label'
        textareaLabel.innerText = 'Note Content'


        formWrapper.append(titleInput, titleLabel)

        form.append(formWrapper, formTextareaWrapper, textAreaWrapper)

    };

    static showModal = (note: INote, parent: HTMLElement) => {
        const createdModal = Modal.createModalElements(note)
        parent.appendChild(createdModal)
    }

}