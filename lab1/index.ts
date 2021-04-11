class StartApplication {

    dataInputs: NodeListOf<HTMLInputElement>;
    resultInputs: NodeListOf<HTMLInputElement>;
    arr: Array<number> = [];
    
    constructor() {
        this.startApp();
    }

    startApp() {
        this.getInputs();
        this.getInputsValue();
    }

    // get inputs from DOM
    getInputs() {
        this.dataInputs = document.querySelectorAll('.field');
        this.resultInputs = document.querySelectorAll('.result');
    }

    // get value from specyfic inputs
    getInputsValue() {
        this.dataInputs.forEach(item => item.addEventListener('input', () => this.computedValue(item)))
    }
    

    computedValue(item: HTMLInputElement) {
        if (item.value && this.arr.length < 4) {
            this.arr.push(Number(item.value))
        }
    
        if (this.arr[item.id] !== +item.value ) {
            this.arr[item.id] = Number(item.value);
        }
        
        let sum = this.arr.reduce((a,b) => a + b);
        let avg = sum / this.dataInputs.length;
        let min = Math.min.apply(null, this.arr);
        let max = Math.max.apply(null, this.arr);
        this.showResult(sum, avg, min, max);
    }

    showResult(sum: number, avg: number, min: number, max: number) {
        this.resultInputs.forEach(item => {
            switch (item.id) {
                case 'sum':
                    item.value = sum.toString()
                    break;
                case 'avg':
                    item.value = avg.toString()
                    break;
                case 'min':
                    item.value = min.toString();
                    break;
                case 'max':
                    item.value = max.toString();
                    break;
                default:
                    item.value = "0"
            }
        })
    }

}

new StartApplication();
