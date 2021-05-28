"use strict";
exports.__esModule = true;
exports.App = void 0;
var note_1 = require("./note");
var note = new note_1.Note("nowa notatka", "content", { white: true, green: false, yellow: false });
console.log(note);
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.keyAPI = 'ba6ffd1501fe941bdb28f64bef15f7a9';
        this.notes = [];
        this.submitForm = function () {
            var form = document.querySelector('#form');
            var formData = new FormData(form);
            for (var _i = 0, _a = formData.values(); _i < _a.length; _i++) {
                var value = _a[_i];
                console.log(value);
            }
        };
        this.saveDataToStorage = function () {
            localStorage.setItem('notes', JSON.stringify(_this.notes));
        };
        // renderCards = (): void => {
        //     const wrapper: HTMLElement = document.querySelector(".cards");
        //     if (this.cities.length > 0 && wrapper.childElementCount === 0) {
        //         this.cities.forEach((element, index) => wrapper.innerHTML += card(element, index))
        //     } else if (wrapper.childElementCount > 0) {
        //         for (let i = this.cities.length - 1; i <= this.cities.length; i++){
        //             wrapper.innerHTML += card(this.cities[i], i);
        //         }
        //     }
        //     else {
        //         wrapper.innerHTML = 'Add cities that u like to know weather';
        //     }
        // }
    }
    return App;
}());
exports.App = App;
