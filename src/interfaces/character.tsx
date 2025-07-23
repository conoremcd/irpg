import Item from "@/interfaces/item";

export interface Stats {

}

export interface Skill {

}

export interface Attribute {

}

export interface Action {

}

export default interface Character {
    id: number,
    name: string,
    level: number,
    expPoints: number,
    avatar: MediaImage,
    stats: Stats,
    skillList: Skill[],
    attributes: Attribute[],
    actions: Action[],
    pockets: Item[],
    bag: Item[],
}