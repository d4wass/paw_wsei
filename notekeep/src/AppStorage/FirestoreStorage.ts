import { firebaseConfig } from './config';
import firebase from 'firebase';
import { INote, AppStorage } from '../interfaces';

export class FirestoreStorageApp implements AppStorage{
    db: firebase.firestore.Firestore

    constructor() {
        const firebaseApp = firebase.initializeApp(firebaseConfig)
        this.db = firebaseApp.firestore()
    }



    async addNote(note: INote) {
        const res = await this.db.collection('notes').add(note)
    }

    async deleteNote(id: string) {
        const res = await this.db.collection('notes').doc(id).delete()
    }

    async updateNote(id: string, note: INote) {
        const res = await this.db.collection('notes').doc(id).update(note)
    }

    async getNote(id: INote['id']) {
        return this.db.collection('notes').doc(id).get().then(res => ({id: res.id, data: res.data()}))
    }

    async getNotes() {
        return this.db.collection('notes').get().then(res => ({size: res.size, notes: res.docs.map(item => ({id: item.id, data: item.data()}))}))
    }
}
