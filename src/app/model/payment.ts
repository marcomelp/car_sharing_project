import { User } from "./user";

export interface Payment {
    id?:number;
    type?:string;
    cardNumber?:string;
    holder?:string;
    expiration?:string;
    user?:User;
}
