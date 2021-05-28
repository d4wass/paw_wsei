import { INote } from './interfaces'

export const noteItem = (note: INote) => {
    let htmlTemplate = `
        <div class="note">
            <h3>${note.title}</h3>
            <div class="note_content">
                <p class="note_content_paragraph">
                    ${note.content}
                </p>
                <span class="note_content_data">${note.createdDate}</span>
            </div>
        </div>`;

    return htmlTemplate;
}

export const getCurrentDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    let todayString = `${dd}/${mm}/${yyyy}`;
    return todayString;
}