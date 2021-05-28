"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.App = void 0;
var noteItem = function (note) {
};
var card = function (cardItem, index) {
    var main = cardItem.main, name = cardItem.name, weather = cardItem.weather, wind = cardItem.wind;
    var tempStringHTML = "<div class=\"card\" id=\"" + index + "\">\n\t<div class=\"main\">\n        <h5 class=\"city\">" + name + "</h5>\n        <div class=\"content\">\n            <div>\n                <h5>Icon</h5>\n                <h5>" + weather[0].description + "</h5>\n            </div>\n            <div>\n                <h5>Temp: " + Math.floor(main.temp) + "&deg;C</h5>\n                <h5>Feel: " + Math.floor(main.feels_like) + "&deg;C</h5>\n            </div>\n        </div>\n        <button class=\"info\" id=\"infoBtn\" data-card-number=\"" + index + "\"></button>\n\t</div>\n        <div class=\"additional\" id=\"additional\">\n            <div>\n                <h5>Wind</h5>\n                <p>" + wind.speed + "</p>\n            </div>\n            <div>\n                <h5>Humidity</h5>\n                <p>" + main.humidity + "</p>\n            </div>\n            <div>\n                <h5>Pressure</h5>\n                <p>" + main.pressure + "hPa</p>\n            </div>\n        </div>\n    </div>";
    return tempStringHTML;
};
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.keyAPI = 'ba6ffd1501fe941bdb28f64bef15f7a9';
        this.cities = [];
        this.showInputValue = function (e) { return _this.city = e.target.value; };
        this.saveDataToStorage = function (data) {
            var wind = data.wind, name = data.name, main = data.main, weather = data.weather;
            _this.cities.push({ wind: wind, name: name, main: main, weather: weather });
            localStorage.setItem('weatherData', JSON.stringify(data));
            localStorage.setItem('cities', JSON.stringify(_this.cities));
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
        this.handleMoreInfoBtn = function (index) {
            var cards = document.querySelectorAll('.card');
            var card = cards[Number(index)].children[1];
            if (card.style.top === '225px') {
                card.style.top = '0';
            }
            else {
                card.style.top = '225px';
            }
        };
    }
    App.prototype.getWeatherData = function (city) {
        return __awaiter(this, void 0, void 0, function () {
            var URI, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!city) return [3 /*break*/, 5];
                        URI = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.keyAPI;
                        return [4 /*yield*/, fetch(URI)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [4 /*yield*/, this.saveDataToStorage(data)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.renderCards()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, data];
                    case 5:
                        alert("please enter a city");
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return App;
}());
exports.App = App;
