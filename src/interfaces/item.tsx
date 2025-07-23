export enum ItemType {

    
}

export enum Rarity {
    common = 'cmn',
    uncommon = 'uncmn',
    semiRare = 'semi-r',
    rare = 'r',
    secretRare = 'sec-r',
    ultraSecretRare = 'ult-sec-r',
    uniqueRare = 'unq-r'
}

export default interface Item {
    id: number,
    count: number,
    weight: number,
    name: string,
    type: ItemType,
    rarity: Rarity,
    affect: string,
}