// interfaces
import Character from "@/interfaces/character";
import { CalendarMonth, DateInterval } from "react-day-picker";

export enum RoleTag {
    GM = "GM",
    PLAYER = "Player"
}

export default interface Story {
    id: string,
    title: string,
    userRole: RoleTag,
    overview?: string,
    avatar?: MediaImage,
    progress?: number,
    schedule?: string[],
    players?: Character[],
    npcs?: Character[],
    createdOn: string,
    lastUpdated: string,
    isEditing: boolean,
}