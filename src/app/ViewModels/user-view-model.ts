export interface User{
    id: number,
    Full_Name: string,
    Email: string,
    Mobile_number: string[],
    Address:{
        City: string,
        postalCode: string,
        street: string,
    },
    password:string
}