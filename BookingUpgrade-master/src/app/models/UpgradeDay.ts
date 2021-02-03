import { UpgradeGroup } from "./UpgradeGroup";

export interface UpgradeDay{
    date: Date;
    groups:UpgradeGroup[];
}