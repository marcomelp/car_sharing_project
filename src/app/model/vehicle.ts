import { StandoffArea } from "./standoff-area";

export interface Vehicle {
    id?:number;
    plateNumber?: string;
    registrationYear?: number;
    lastKm?: number;
    lastDetenctionDate?: string;
    lastReviewDate?: string;
    state?: string;
    rate?: number;
    standoffArea?:StandoffArea;
}
