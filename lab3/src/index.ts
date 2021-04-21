import { App } from "./app";
import './style.scss';

const app = new App();

const input: HTMLInputElement = document.querySelector('#city');
const form: HTMLFormElement = document.querySelector('#form');

input.addEventListener('input', (e) => app.showInputValue(e))
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formValue = (form.elements[0] as HTMLInputElement);
    app.getWeatherData(formValue.value)
    input.value = ""
})

document.addEventListener('click', (e: Event & {target: HTMLButtonElement}) => {
    if (e.target && e.target.id === "infoBtn") {
        app.handleMoreInfoBtn();
    }
})