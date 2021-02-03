export interface UpgradeSlot{
    id:string;
    //groupId:string;
    startTime: Date;
    endTime: Date; 
    available:boolean;
    herId?:string;
    bookedBy?: string;
    executed: boolean;
}