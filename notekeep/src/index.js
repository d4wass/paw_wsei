"use strict";
exports.__esModule = true;
var app_1 = require("./app");
require("./style.scss");
var app = new app_1.App();
var input = document.querySelector('#city');
var form = document.querySelector('#form');
// input.addEventListener('input', (e) => app.showInputValue(e))
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var formValue = form.elements[0];
    app.submitForm();
    input.value = "";
});
document.addEventListener('click', function (e) {
    if (e.target && e.target.id === "infoBtn") {
        // app.handleMoreInfoBtn(e.target.dataset.cardNumber);
    }
});
