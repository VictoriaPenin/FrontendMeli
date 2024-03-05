export interface MetricsUser {
    level_id:string,
    power_seller_status:string,
    realLevel: null,
    nickname:String,
    protectionEndDate: null,
    transactions: {
        canceled: number,
        completed: number,
        period: string,
        ratings: number,
        total: number
    },
    metrics: any
}

export interface categorie{
    id:string,
    name:string,
}

export interface TopItem{
    name:String,
    isCatalogo:string,
    price:String,
    imagen:String,
    url:string
}
