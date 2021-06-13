import { INote } from './interfaces';
import { getCurrentDate, createId } from './utils';

export class Modal {
    title: string;
    content: string;

    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }

    static createModalElements = (note: INote) => {

        const modal = document.createElement('div');
        const modalCloseBtn = document.createElement('div');
        const modalInputs = document.createElement('div');
        const modalSaveBtn = document.createElement('div');
        const inputWrapper = document.createElement('div');
        const textareaWrapper = document.createElement('div');

        const titleModal = document.createElement('h4');
        const closeBtn = document.createElement('button');
        const saveBtn = document.createElement('button');

        const titleInput = document.createElement('input');
        const textarea = document.createElement('textarea');
        const titleLabel = document.createElement('label');
        const textareaLabel = document.createElement('label');

        titleModal.innerText = `Edit your ${note.title} note`
        closeBtn.innerText = 'x';
        saveBtn.innerText = 'save';

        modal.className = 'modal_wrapper';
        modalCloseBtn.className = 'modal_wrapper_close';
        modalInputs.className = 'modal_wrapper_inputs';
        modalSaveBtn.className = 'modal_wrapper_btn';
        inputWrapper.className = 'modal_wrapper_inputs_input';

        titleInput.className = 'modal_wrapper_inputs_input__input'
        titleInput.type = 'text';
        titleInput.id = 'title_modal';
        titleInput.name = 'title';
        titleInput.value = note.title;
        titleLabel.className = 'modal_wrapper_inputs_input__label'
        titleLabel.innerText = 'Title'

        textarea.className = 'modal_wrapper_inputs_textarea__textarea'
        textarea.id = 'content_modal';
        textarea.name = 'content';
        textarea.value = note.content
        textareaLabel.className = 'modal_wrapper_inputs_textarea__label'
        textareaLabel.innerText = 'Note Content'

        inputWrapper.append(titleInput, titleLabel);
        textareaWrapper.append(textarea ,textareaLabel)
        textareaWrapper.append();
        modalCloseBtn.append(titleModal, closeBtn);
        modalInputs.append(inputWrapper, textareaWrapper)
        modalSaveBtn.append(saveBtn)

        modal.append(modalCloseBtn, modalInputs, modalSaveBtn)
        return modal;
    };

    static showModal = (note: INote, parent: HTMLElement) => {
        const createdModal = Modal.createModalElements(note)
        parent.appendChild(createdModal)
    }

}