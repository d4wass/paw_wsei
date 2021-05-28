import { Note } from './interfaces'

export const noteItem = (note: Note) => {
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