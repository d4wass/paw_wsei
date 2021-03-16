var StartApplication = /** @class */ (function () {
    function StartApplication() {
        this.arr = [];
        this.startApp();
    }
    StartApplication.prototype.startApp = function () {
        this.getInputs();
        this.getInputsValue();
    };
    // get inputs from DOM
    StartApplication.prototype.getInputs = function () {
        this.dataInputs = document.querySelectorAll('.field');
        this.resultInputs = document.querySelectorAll('.result');
    };
    // get value from specyfic inputs
    StartApplication.prototype.getInputsValue = function () {
        var _this = this;
        this.dataInputs.forEach(function (item) { return item.addEventListener('input', function () { return _this.computedValue(item); }); });
    };
    StartApplication.prototype.computedValue = function (item) {
        var _this = this;
        this.arr.push(+item.value);
        var filtered = this.arr.filter(function (item, pos) { return _this.arr.indexOf(item) == pos; });
        console.log(this.arr);
        console.log(filtered);
        var sum = filtered.reduce(function (a, b) { return a + b; });
        var avg = sum / this.dataInputs.length;
        var min = Math.min.apply(null, filtered);
        var max = Math.max.apply(null, filtered);
        this.showResult(sum, avg, min, max);
    };
    StartApplication.prototype.showResult = function (sum, avg, min, max) {
        this.resultInputs.forEach(function (item) {
            switch (item.id) {
                case 'sum':
                    item.value = sum.toString();
                    break;
                case 'avg':
                    item.value = avg.toString();
                    break;
                case 'min':
                    item.value = min.toString();
                    break;
                case 'max':
                    item.value = max.toString();
                    break;
                default:
                    item.value = "0";
            }
        });
    };
    return StartApplication;
}());
var start = new StartApplication();
start.startApp();
