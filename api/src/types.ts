export interface UserInput {
    username: string,
    password: string,
}

export interface UserData {
    id: number,
    username: string,
    password: string,
    token: string,
    created_at: string,
    updated_at: string,
}

export type Quarter = '1' | '2' | '3' | '4' | null

export interface RewardData {
    rate: number,
    active_quarter: Quarter,
    expires_at: string | null,
    expires_in: string | null,
    category: string | null,
    subcategory: string | null,
}

export interface SubcategoryData extends RewardData {
    card_id: number
}

export interface RecommendedCardData {
    card_id: number,
    base_rate: number,
    category_rate: number | null,
    rewards: RewardData[]
}

export interface RewardCategory {
    category: string,
    category_rate: number | null,
    rewards: RewardData[]
}