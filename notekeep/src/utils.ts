import { INote, Color } from './interfaces'


export const getCurrentDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    let todayString = `${dd}/${mm}/${yyyy}`;
    return todayString;
}

export const createId = () => {
    let id = Number(new Date());
    return String(id)
}