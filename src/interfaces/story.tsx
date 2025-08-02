// interfaces
import Character from "@/interfaces/character";
import { CalendarMonth, DateInterval } from "react-day-picker";

export enum RoleTag {
    GM = "GM",
    PLAYER = "Player"
}

export default interface Story {
    id: number,
    title: string,
    overview?: string,
    avatar?: MediaImage,
    players?: Character[],
    npcs?: Character[],
    progress?: number,
    schedule?: Date[],
    userRole: RoleTag,
}