import { UpgradeSlot } from "./UpgradeSlot";

export interface UpgradeGroup{
    startTime: string;
    // endTime: string;
    slots:UpgradeSlot[];
}