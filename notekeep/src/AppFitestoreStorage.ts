import { firebaseConfig } from './config';
import firebase from 'firebase';
import { INote } from './interfaces';


interface AppStorage { }

export class AppFirestoreStorage {
    private constructor() {
        const firebaseApp = firebase.initializeApp(firebaseConfig)
        db: firebaseApp.firestore()
    }


//dodawanie notatek do bazy
// addNote(note)
async function addNote(note: any) {
    const res = await this.db.collection('notes').add(note)
}

//usuwanie notatek
async function deleteNote(id: string) {
    const res = await this.db.collection('notes').doc(id).delete()
}

//aktualizacja notatki
async function updateNote(id: string, note: any) {
    const res = await this.db.collection('notes').doc(id).update(note)
}

//pobranie notatki z jej id i danymi

async function getNote(id: string) {
    return this.db.collection('notes').doc(id).get().then(res => ({id: res.id, data: res.data()}))
}

//pobranie kolekcji notatek
async function getNotes() {
    return this.db.collection('notes').get().then(res => ({
        size: res.size, docs: res.docs.map(item => ({ id: item.id, data: item.data() }))
    }
}
}

