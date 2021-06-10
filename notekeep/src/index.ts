import { App } from "./app";
import './style.scss';
import firebase from 'firebase';
import { firebaseConfig } from './config';

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();

const app = new App();


const note = {
    title: "Mdupa",
    content: "content",
    createdDate: '10/20/21'
}

//dodawanie notatek do bazy
// addNote(note)
async function addNote(note: any) {
    const res = await db.collection('notes').add(note)
}

//usuwanie notatek
deleteNote('NMYNune51nrUgcLMh1oH')
async function deleteNote(id: string) {
    const res = await db.collection('notes').doc(id).delete()
}

//aktualizacja notatki
updateNote('qkTLJGtTSwL3nitH8hQ3', {
    title: "Zmieniona notatka",
    content: "zmieniony content",
    createdDate: '10/20/21'
})
async function updateNote(id: string, note: any) {
    const res = await db.collection('notes').doc(id).update(note)
}

//pobranie notatki z jej id i danymi
getNote('qkTLJGtTSwL3nitH8hQ3').then(
    res => console.log(res)
)

async function getNote(id: string) {
    return db.collection('notes').doc(id).get().then(res => ({id: res.id, data: res.data()}))
}

//pobranie kolekcji notatek
getNotes().then(res => console.log(res))
async function getNotes() {
    return db.collection('notes').get().then(res => ({size: res.size, docs: res.docs.map(item => ({id: item.id, data: item.data()}))
}