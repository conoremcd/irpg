// interfaces
import Character from "@/interfaces/character";

export default interface Story {
    id: number,
    title: string,
    overview?: string,
    avatar?: MediaImage,
    players?: Character[],
    npcs?: Character[],
}