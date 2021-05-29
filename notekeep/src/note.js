"use strict";
exports.__esModule = true;
exports.Note = void 0;
var utils_1 = require("./utils");
var Note = /** @class */ (function () {
    function Note(title, content, color) {
        this.renderNote = function (note) { return utils_1.noteItem(note); };
        this.title = title;
        this.content = content;
        this.color = color;
        this.createdDate = utils_1.getCurrentDate();
    }
    return Note;
}());
exports.Note = Note;
;
