

export enum Dice {
    D4 = 4,
    D6 = 6,
    D8 = 8,
    D10 = 9,
    D12 = 12,
    D20 = 20,
    D100 = 100,
}

export default interface Skill {
    die: Dice, 
    bonus: number,
    title: string,
    desc: string,
}
