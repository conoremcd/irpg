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
    userRole: RoleTag,
    overview?: string,
    avatar?: MediaImage,
    progress?: number,
    schedule?: Date[],
    players?: Character[],
    npcs?: Character[],
}