"use strict";
exports.__esModule = true;
exports.noteItem = void 0;
exports.noteItem = function (note) {
    var htmlTemplate = "\n        <div class=\"note\">\n            <h3>" + note.title + "</h3>\n            <div class=\"note_content\">\n                <p class=\"note_content_paragraph\">\n                    " + note.content + "\n                </p>\n                <span class=\"note_content_data\">" + note.createdDate + "</span>\n            </div>\n        </div>";
    return htmlTemplate;
};
