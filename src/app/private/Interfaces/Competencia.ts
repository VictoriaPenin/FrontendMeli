
//Filtros
export interface AvailableFilter {
    
    id: string;
    name: string;
    type: string;
    values: Value[];
  }
  
  export interface Value {
    id: string;
    name: string;
    results: number;
  }
  export interface ProductResponse{
    available_filters: AvailableFilter[],
    available_sorts: AvailableSorts[],
    results: ItemCompetencia[],
    seller:seller,
    paging: Paging;
  }
//Item
  export interface ItemCompetencia{
    title: String,
    price: number,
    condition: String,
    catalog_product_id: String,
    listing_type_id: String,
    permalink: string,
    buying_mode: String,
    thumbnail: string,
    original_price: number,
    sale_price:string,
    available_quantity: number,
    official_store_id: string,
    use_thumbnail_id: boolean,
    accepts_mercadopago: boolean,
    shipping: Shipping,

  }
  export interface Shipping{
    store_pick_up: boolean,
    free_shipping: true,
    logistic_type: string,
    mode: string,
    tags: string[],
    benefits: string,
    promise:string


  }

//sorts 

export interface AvailableSorts{
    id:string,
    name:string,
}
//seller
export interface seller{
  id:string
  nickname:string,
}

export interface Paging {
  total:number,
  primary_results:number,
  offset:number,
  limit:number
}