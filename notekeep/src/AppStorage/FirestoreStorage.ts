import { firebaseConfig } from './config';
import firebase from 'firebase';
import { INote, AppStorage } from '../interfaces';

export class FirestoreStorageApp implements AppStorage{
    db: firebase.firestore.Firestore

    constructor() {
        if (!firebase.apps.length) {
            this.db = firebase.initializeApp(firebaseConfig).firestore()
        } else {
            this.db = firebase.app().firestore()
        }
    }

    async addNote(note: INote) {
        await this.db.collection('notes').doc().set(Object.assign({}, note))
    }

    async deleteNote(id: string) {
        await this.db.collection('notes').doc(id).delete()
    }

    async updateNote(id: string, note: INote) {
        await this.db.collection('notes').doc(id).update(note)
    }

    async getNote(id: INote['id']) {
        await this.db.collection('notes').doc(id).get().then(res => ({ id: res.id, data: res.data() }))

    }

    async getNotes() {
        const res = await this.db.collection('notes').get()
            .then(res => ({
                notes: res.docs.map((item): INote => ({
                    id: item.id,
                    color: item.data().color,
                    content: item.data().content,
                    title: item.data().title,
                    createdDate: item.data().createdData
                }))
            }))
        return Promise.resolve(res)
    }
}
