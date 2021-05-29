import { INote, Color } from './interfaces'

const filterColorObject = (colors: Color) => {
    const keys = Object.keys(colors);
    const choosenColor = keys.filter((key: string) => (colors[key]))

    return choosenColor[0];
}

export const noteItem = (note: INote): string => {
    let htmlTemplate = `
        <div class="note" id="${filterColorObject(note.color)}">
            <h3>${note.title}</h3>
            <div class="note_content">
                <div class="note_content_wrapper">
                    <p class="note_content_paragraph">
                        ${note.content}
                    </p>
                    <span class="note_content_data">${note.createdDate}</span>
                </div>
                <div class="note_content_btn">
                    <button id="edit">edit</button>
                    <button id="remove">remove</button>
                </div>
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