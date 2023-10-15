import { User } from "./user";
import { Vehicle } from "./vehicle";

export interface Rental {
    id?:number;
    pickupTiming?: string;
    returnTiming?: string;
    amount?: number;
    state?: string;
    user?:User;
    vehicle?:Vehicle;
}
