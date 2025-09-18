// interfaces
import Character from "@/interfaces/character";
import { CalendarMonth, DateInterval } from "react-day-picker";

export enum RoleTag {
    GM = "GM",
    PLAYER = "Player"
}

export interface Story {
    id: string,
    title: string,
    userRole: RoleTag,
    overview?: string,
    avatar_url?: string,
    progress?: number,
    schedule?: string[],
    players?: string[],
    npcs?: string[],
    last_updated: string,
}