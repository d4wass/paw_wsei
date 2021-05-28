"use strict";
exports.__esModule = true;
exports.getCurrentDate = exports.noteItem = void 0;
exports.noteItem = function (note) {
    var htmlTemplate = "\n        <div class=\"note\">\n            <h3>" + note.title + "</h3>\n            <div class=\"note_content\">\n                <p class=\"note_content_paragraph\">\n                    " + note.content + "\n                </p>\n                <span class=\"note_content_data\">" + note.createdDate + "</span>\n            </div>\n        </div>";
    return htmlTemplate;
};
exports.getCurrentDate = function () {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var todayString = dd + "/" + mm + "/" + yyyy;
    return todayString;
};
