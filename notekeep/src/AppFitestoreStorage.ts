import { firebaseConfig } from './config';
import firebase from 'firebase';
import { INote } from './interfaces';

interface AppStorage {
    addNote: (note: INote) => Promise<void>,
    deleteNote: (id: INote['id']) => Promise<void>,
    updateNote: (id: INote['id'], note: INote) => Promise<void>
    getNote: (id: INote['id']) => Promise<{id: INote['id'], data: INote}>,
    getNotes: () => Promise<{size: number, docs: INote[]}>
}

export class AppFirestoreStorage implements AppStorage{
    db: firebase.firestore.Firestore

    private constructor() {
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
