export * from './store'
export type { AuthMethod } from './auth/Auth'

export interface APIError {
    code: number,
    message: string,
    detail: string
}

export interface UserAuthInput {
    username: string,
    password: string,
}

export interface UserData {
    id?: number,
    username?: string,
    token?: string,
    error?: APIError,
    created_at?: string,
    updated_at?: string,
}

export type CardTypeSymbol = 'x' | '%'
export type CardType = 'point' | 'mile' | 'cash'

export type CardTypeSymbolMap = {
    [key in CardType]: CardTypeSymbol
}

export interface CardData {
    card_id: number,
    name: string,
    type: CardType,
    issuer: string,
    network: string,
    approved_on: string,
    base_rate: number,
    reward_categories: CardRewardCategories[]
}

export interface CardRewardCategories {
    category: string,
    category_rate: number,
    rewards: RewardData[]
}

export interface RewardData {
    rate: number,
    active_quarter: string | null,
    expires_at: string | null,
    expires_in: string | null,
    category: string | null,
    subcategory: string | null,
}

export interface RecommendedCardData {
    card_id: number,
    base_rate: number,
    category_rate: number | null,
    rewards: RewardData[]
}

export interface CategoryData {
    id: number,
    name: string,
    recommended: RecommendedCardData[]
}