

export interface paging{
    total:number,
    limit:number,
    offset:number,
    kvs_total:number
}
export interface reviews{
    id:number,
    date_created:string,
    status:string,
    title:string,
    content:string,
    rate:number,
    valorization:number,
    likes:number,
    dislikes:number,
}
export interface rating_levels{
    one_star:number,
    two_star:number,
    tree_star:number,
    four_star:number,
    five_star:number
}
export interface ResposeOpniones{
    reviews:reviews[],
    paging: paging,
    rating_average:number,
    rating_levels:rating_levels


}