import { Address } from "./address";
import { Payment } from "./payment";
import { Rental } from "./rental";

export interface User {
    id?: number;
    name?: string;
    lastname?: string;
    taxCode?: string;
    licenseNumber?: string;
    mail?: string;
    password?:string;
    licenseImage?: string;
    authToken?: string;
    address?: Address;
    payment?: Payment;
    rentals?: Rental[];
}
