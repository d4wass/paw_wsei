import { Note } from './note';
import { INote } from './interfaces';

const note = new Note("nowa notatka", "content", { white: true, green: false, yellow: false });
console.log(note)

export class App {
    keyAPI = 'ba6ffd1501fe941bdb28f64bef15f7a9';
    city: string;
    notes: INote[] = []

    submitForm = () => {
        const form: HTMLFormElement = document.querySelector('#form');
        const radioBtnList: boolean[] = [...form.elements["drone"]].map(item => item.checked);
        const titleValue: string = form.elements["title"].value
        const contentValue: string = form.elements["content"].value

        console.log(radioBtnList)

        const note = new Note(titleValue, contentValue, { white: radioBtnList[0], green: radioBtnList[2], yellow: radioBtnList[1] })
        console.log(note)
    }

    saveDataToStorage = (): void => {
        localStorage.setItem('notes', JSON.stringify(this.notes));
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

