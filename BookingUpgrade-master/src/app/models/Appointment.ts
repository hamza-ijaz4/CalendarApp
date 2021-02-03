import { Time } from "@angular/common";

export interface Appointment
{   
    //id: guid
    versionNumber: string;
    date : string;
    hour: string; //Time?
    durationMin: string; //Number
    available:boolean;
    herId?:string;
    bookedBy?: string;
    executed: boolean;
}