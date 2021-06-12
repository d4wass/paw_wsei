import firebase from 'firebase';


export interface INote {
     id?: string,
     title: string,
     content: string,
     color: Color
     createdDate: string
}

export interface Color extends IObjectKeys {
    white: boolean;
    green: boolean;
    yellow: boolean
}

export interface AppStorage {
    addNote: (note: INote) => Promise<void>,
    deleteNote: (id: INote['id']) => Promise<void>,
    updateNote: (id: INote['id'], note: INote) => Promise<void>
    getNote: (id: INote['id']) => Promise<{id: INote['id'], data: INote }>,
    getNotes: () => Promise<{size: number, notes: INote[]}>
}


interface IObjectKeys {
    [key: string]: string | boolean
}
