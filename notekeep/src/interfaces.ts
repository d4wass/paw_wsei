 export interface INote {
     id: any,
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

interface IObjectKeys {
    [key: string]: string | boolean
}
