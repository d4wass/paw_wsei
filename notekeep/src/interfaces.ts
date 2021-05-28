 export interface INote {
     id: any,
     title: string,
     content: string,
     color: {
         white: boolean,
         green: boolean,
         yellow: boolean,
     }
     createdDate: string
}