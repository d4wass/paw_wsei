"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.App = void 0;
var note_1 = require("./note");
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.notes = [];
        this.submitForm = function () {
            var form = document.querySelector('#form');
            var radioBtnList = __spreadArrays(form.elements["drone"]).map(function (item) { return item.checked; });
            var titleValue = form.elements["title"].value;
            var contentValue = form.elements["content"].value;
            var note = new note_1.Note(titleValue, contentValue, { white: radioBtnList[0], green: radioBtnList[2], yellow: radioBtnList[1] });
            _this.notes.push(note);
            _this.saveDataToStorage();
        };
        this.saveDataToStorage = function () {
            localStorage.setItem('notes', JSON.stringify(_this.notes));
        };
        this.renderCards = function () {
            var wrapper = document.querySelector(".cards");
            if (_this.cities.length > 0 && wrapper.childElementCount === 0) {
                _this.cities.forEach(function (element, index) { return wrapper.innerHTML += card(element, index); });
            }
            else if (wrapper.childElementCount > 0) {
                for (var i = _this.cities.length - 1; i <= _this.cities.length; i++) {
                    wrapper.innerHTML += card(_this.cities[i], i);
                }
            }
            else {
                wrapper.innerHTML = 'Add cities that u like to know weather';
            }
        };
        this.bindEventToForm = function () {
            var form = document.querySelector('#form');
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                var formValue = form.elements[0];
                _this.submitForm();
            });
        };
        this.bindEventToForm();
    }
    return App;
}());
exports.App = App;
